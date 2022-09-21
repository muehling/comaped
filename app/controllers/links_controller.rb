class LinksController < ApplicationController

  skip_before_action :check_login_backend
  before_action :set_concept_map
  before_action :set_link, only: [:edit, :update, :destroy]

  # POST /concept_maps/1/links
  def create
    @link = @map.links.build(link_params)
    if @link.save
      @map.versionize(DateTime.now)
    end

    # DH: Update the student "updatet_at" (to know when the last ation happened)
    Student.update(@current_student.id, :updated_at => DateTime.now)

    # DH: Broadcast the link creation
    ActionCable.server.broadcast("test_channel", {map_id: @map.id, action: "create", type: "link",
      user_id: @current_student.id, user: @current_student.name, user_color: @current_student.color,
      id: @link.id, label: @link.label, start: @link.start_id, end: @link.end_id})

  end

  # PATCH/PUT /concept_maps/1/links/1
  def update
    # DH: Get the old values
    label_old = @link.label
    lock_old = @link.lock
    #DH: Add the lock parameter
    if @link.update(link_params.permit(:label, :lock))
      @map.versionize(DateTime.now)
    end

    # DH Update the student "updatet_at" (to know when the last ation happened)
    Student.update(@current_student.id, :updated_at => DateTime.now)

    # DH: Broadcast the link update
    ActionCable.server.broadcast("test_channel", {map_id: @map.id, action: "update", type: "link",
      user_id: @current_student.id, user: @current_student.name, user_color: @current_student.color,
      id: @link.id, label: @link.label, lock: @link.lock, lock_old: lock_old, label_old: label_old, start: @link.start_id, end: @link.end_id})

    render :create
  end

  # DELETE /concept_maps/1/links/1
  def destroy
    # DH Update the student "updatet_at" (to know when the last ation happened)
    Student.update(@current_student.id, :updated_at => DateTime.now)

    # DH: Broadcast the link deletion
    ActionCable.server.broadcast("test_channel", {map_id: @map.id, action: "destroy", type: "link",
      user_id: @current_student.id, user: @current_student.name, user_color: @current_student.color,
      id: @link.id, label: @link.label})
    @link.destroy
    @map.versionize(DateTime.now)
    head :ok
  end

  private

  def set_link
    @link = Link.find(params[:id])
    unless !@link.nil? && @link.concept_map == @concept_map
      redirect_to '/'
    end
  end

  def set_concept_map
    @concept_map = ConceptMap.find_by_code(params[:concept_map_code])
    unless !@concept_map.nil? && @concept_map == @map
      redirect_to '/'
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def link_params
    # DH: Add the lock parameter
    params.require(:link).permit([:label, :lock, :start_id, :end_id])
  end

end
