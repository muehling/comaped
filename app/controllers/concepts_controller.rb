class ConceptsController < ApplicationController
  before_action :set_concept_map
  before_action :set_concept, only: [:edit, :update, :destroy]

  # POST /concept_maps/1/concepts.js
  def create
    @concept = @map.concepts.build(concept_params)
    respond_to do |format|
      if @concept.save
        format.js {}
        #format.json { render :show, status: :created, location: @project }
      else
        format.js {render nothing: true}
        #format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /concept_maps/1/concepts/1.js
  def update
    respond_to do |format|
      if @concept.update(concept_params)
        format.js { }
        #       format.json { render :show, status: :ok, location: @project }
      else
        format.js { render :edit }
        #       format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_concept
    @concept = Concept.find(params[:id])
    unless !@concept.nil? && @concept.concept_map == @concept_map
      redirect_to '/'
    end
  end

  def set_concept_map
    @concept_map = ConceptMap.find(params[:concept_map_id])
    unless !@concept_map.nil? && @concept_map == @map
      redirect_to '/'
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def concept_params
    params.fetch(:concept, {}).permit([:label, :x, :y])
  end

end
