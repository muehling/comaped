class ConceptsController < ApplicationController
  skip_before_action :check_login_backend
  before_action :set_concept_map
  before_action :set_concept, only: %i[edit update destroy]

  # POST /concept_maps/1/concepts
  def create
    @concept = @map.concepts.build(concept_params)
    @map.versionize(DateTime.now) if @concept.save

    # DH: Update the student "updatet_at" (to show his last action)
    propagate_to_subscribers('create')
  end

  # PATCH/PUT /concept_maps/1/concepts/1
  def update
    old_data = {
      old_label: @concept.label,
      old_x: @concept.x,
      old_y: @concept.y,
      old_color: @concept.color,
      old_shape: @concept.shape,
      old_lock: @concept.lock
    }

    if @concept.update(concept_params)
      @map.versionize(DateTime.now) unless concept_params[:label] == old_data['old_label']
    end
    render :create

    propagate_to_subscribers('update', old_data)
  end

  # DELETE /concept_maps/1/concepts/1.js
  def destroy
    @concept.destroy
    @map.versionize(DateTime.now)
    head :ok

    propagate_to_subscribers('destroy')
  end

  private

  def propagate_to_subscribers(action, old_data = {})
    return if !session[:student_id].present?

    Student.update(@current_student.id, updated_at: DateTime.now)

    data = {
      action: action,
      type: 'node',
      user: @current_student.name,
      user_id: @current_student.id,
      user_color: @current_student.color,
      label: @concept.label,
      id: @concept.id,
      x: @concept.x,
      y: @concept.y,
      color: @concept.color,
      shape: @concept.shape,
      map_id: @map.id
    }

    if action == 'update'
      data.merge!(
        {
          lock: @concept.lock,
          label_old: old_data['old_label'],
          x_old: old_data['old_x'],
          y_old: old_data['old_y'],
          color_old: old_data['old_color'],
          lock_old: old_data['old_lock'],
          map_id: @map.id
        }
      )
    end

    ActionCable.server.broadcast('test_channel', data)
  end

  def set_concept
    @concept = Concept.find(params[:id])
    redirect_to '/' unless !@concept.nil? && @concept.concept_map == @concept_map
  end

  def set_concept_map
    @concept_map = ConceptMap.find_by_code(params[:concept_map_code])
    redirect_to '/' unless !@concept_map.nil? && @concept_map == @map
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def concept_params
    params.require(:concept).permit(%i[label lock x y color shape])
  end
end
