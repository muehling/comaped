class ConceptsController < ApplicationController

  skip_before_action :check_login_backend
  before_action :set_concept_map
  before_action :set_concept, only: [:edit, :update, :destroy]

  # POST /concept_maps/1/concepts
  def create
    @concept = @map.concepts.build(concept_params)
    if @concept.save
      @map.versionize(DateTime.now)
    end
  end

  # PATCH/PUT /concept_maps/1/concepts/1
  def update
    old = @concept.label
    if @concept.update(concept_params)
      unless concept_params[:label] == old
        @map.versionize(DateTime.now)
      end
    end
    render :create
  end

  # DELETE /concept_maps/1/concepts/1.js
  def destroy
    @concept.destroy
    @map.versionize(DateTime.now)
    head :ok
  end

  private

  def set_concept
    @concept = Concept.find(params[:id])
    unless !@concept.nil? && @concept.concept_map == @concept_map
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
  def concept_params
    params.require(:concept).permit([:label, :x, :y, :color])
  end

end
