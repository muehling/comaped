class LinksController < ApplicationController
  skip_before_action :check_login_backend
  before_action :set_concept_map
  before_action :set_link, only: %i[edit update destroy]

  # POST /concept_maps/1/links
  def create
    @link = @map.links.build(link_params)
    @map.versionize(DateTime.now) if @link.save

    propagate_to_subscribers('create')
  end

  # PATCH/PUT /concept_maps/1/links/1
  def update
    old_data = { label_old: @link.label, lock_old: @link.lock }

    #DH: Add the lock parameter
    @map.versionize(DateTime.now) if @link.update(link_params.permit(:label, :lock))

    propagate_to_subscribers('update', old_data)
    render :create
  end

  # DELETE /concept_maps/1/links/1
  def destroy
    propagate_to_subscribers('destroy')

    @link.destroy
    @map.versionize(DateTime.now)
    head :ok
  end

  private

  def propagate_to_subscribers(action, old_data = {})
    return if !session[:student_id].present?

    Student.update(@current_student.id, updated_at: DateTime.now)

    data = {
      map_id: @map.id,
      action: action,
      type: 'link',
      user_id: @current_student.id,
      user: @current_student.name,
      user_color: @current_student.color,
      id: @link.id,
      label: @link.label
    }

    if action == 'update'
      data.merge!(
        {
          lock: @link.lock,
          lock_old: old_data['lock_old'],
          label_old: old_data['label_old'],
          start: @link.start_id,
          end: @link.end_id
        }
      )
    end

    ActionCable.server.broadcast('test_channel', data)
  end

  def set_link
    @link = Link.find(params[:id])
    redirect_to '/' unless !@link.nil? && @link.concept_map == @concept_map
  end

  def set_concept_map
    @concept_map = ConceptMap.find_by_code(params[:concept_map_code])
    redirect_to '/' unless !@concept_map.nil? && @concept_map == @map
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def link_params
    # DH: Add the lock parameter
    params.require(:link).permit(%i[label lock start_id end_id])
  end
end
