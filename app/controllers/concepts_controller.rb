class ConceptsController < ApplicationController
  skip_before_action :check_login_backend
  before_action :set_concept_map
  before_action :set_concept, only: %i[edit update destroy]

  # POST /concept_maps/1/concepts
  def create
    @concept = @map.concepts.build(concept_params)
    @map.versionize(DateTime.now) if @concept.save

    # DH: Update the student "updatet_at" (to show his last action)
    Student.update(@current_student.id, updated_at: DateTime.now)

    #DH: Broadcast the node creation
    ActionCable.server.broadcast(
      'test_channel',
      {
        action: 'create',
        type: 'node',
        user: @current_student.name,
        user_id: @current_student.id,
        user_color: @current_student.color,
        label: @concept.label,
        id: @concept.id,
        x: @concept.x,
        y: @concept.y,
        color: @concept.color,
        map_id: @map.id
      }
    )
  end

  # PATCH/PUT /concept_maps/1/concepts/1
  def update
    old_label = @concept.label

    # DH: get the old data
    old_x = @concept.x
    old_y = @concept.y
    old_color = @concept.color
    old_shape = @concept.shape
    old_lock = @concept.lock

    if @concept.update(concept_params)
      @map.versionize(DateTime.now) unless concept_params[:label] == old_label
    end
    render :create

    # DH: Update the student "updatet_at" (to show his last action)
    Student.update(@current_student.id, updated_at: DateTime.now)

    # DH: Broadcast the node update
    ActionCable.server.broadcast(
      'test_channel',
      {
        action: 'update',
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
        lock: @concept.lock,
        label_old: old_label,
        x_old: old_x,
        y_old: old_y,
        color_old: old_color,
        lock_old: old_lock,
        map_id: @map.id
      }
    )
  end

  # DELETE /concept_maps/1/concepts/1.js
  def destroy
    @concept.destroy
    @map.versionize(DateTime.now)
    head :ok

    # DH: Update the student "updatet_at" (to show his last action)
    Student.update(@current_student.id, updated_at: DateTime.now)

    # DH: Broadcast the node deletion
    ActionCable.server.broadcast(
      'test_channel',
      {
        action: 'destroy',
        type: 'node',
        user: @current_student.name,
        user_id: @current_student.id,
        user_color: @current_student.color,
        label: @concept.label,
        id: @concept.id,
        x: @concept.x,
        y: @concept.y,
        color: @concept.color,
        map_id: @map.id
      }
    )
  end

  private

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
    #DH: Add the lock parameter
    params.require(:concept).permit(%i[label lock x y color shape])
  end
end
