class ConceptsController < ApplicationController

  skip_before_action :check_login_backend
  before_action :set_concept_map
  before_action :set_concepts, only: [:edit, :update, :destroy]

  # POST /concept_maps/1/concepts.js
  def create
    @concept = @map.concepts.build(concept_params[:concepts_data])
    respond_to do |format|
      if @concept.save
        @map.versionize(DateTime.now)
        format.js {}
      else
        format.js {head :ok}
      end
    end
  end

  # PATCH/PUT /concept_maps/1/concepts/1.js
  def update
    respond_to do |format|
      @concepts.each do |c|
        old = c.label
        puts(concept_params.has_key?(:id))
        puts(concept_params[:id]!="-1")
        if(params.has_key?(:id)&&params[:id]!="-1")
          if c.update(concept_params[:concepts_data])
            @concept = c
            unless concept_params[:label] == old
              @map.versionize(DateTime.now)
            end
            format.js { }
          else
            format.js { head :ok }
          end
        else
          if c.update(concept_params[:concepts_data][c.id.to_s])
            @concept = c
            unless concept_params[:concepts_data][c.id.to_s][:label] == old
              @map.versionize(DateTime.now)
            end
            format.js { }
          else
            format.js { head :ok }
          end
        end
      end
    end
  end

  # DELETE /concept_maps/1/concepts/1.js
  def destroy
    @concept = @concepts.first
    @concept.destroy
    @map.versionize(DateTime.now)
    respond_to do |format|
      format.js {}
    end
  end

  private

  def set_concepts
    if(params[:concepts].has_key?(:concepts_data)&& (params[:id]=="-1"||params[:id].nil?))
      @concepts = Concept.find(params[:concepts][:concepts_data].keys)
    else
      @concepts = [Concept.find(params[:id])]
    end
    unless !@concepts.nil?&&@concepts.pluck(:concept_map_id).uniq.first == @concept_map.id&&@concepts.pluck(:concept_map_id).uniq.size==1
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
    params.fetch(:concepts, {}).permit(concepts_data:[:label, data:[:x,:y,:color]])
  end

end
