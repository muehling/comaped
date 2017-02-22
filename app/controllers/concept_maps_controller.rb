class ConceptMapsController < ApplicationController
  before_action :set_concept_map, only: [:show, :edit, :update, :destroy]
  skip_before_action :check_login_frontend, except: [:edit]
  skip_before_action :check_login_backend, only: [:edit]

  # GET /concept_maps
  def index
    @concept_maps = ConceptMap.all
  end

  # GET /concept_maps/1
  def show
  end

  # GET /concept_maps/1/edit
  def edit
    if @concept_map.accesses.nil?
      @concept_map.accesses = 0
    end
    @concept_map.accesses = @concept_map.accesses + 1
    @concept_map.save
    if @concept_map.accesses == 1  #First time access => Show the intro sceen
      render 'intro'
    else
      render 'edit'
    end
  end

  # POST /concept_maps
  def create
    @concept_map = ConceptMap.new(concept_map_params)

    respond_to do |format|
      if @concept_map.save
        @concept_map.versionize
        format.html { redirect_to @concept_map, notice: 'Concept map was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  # DELETE /concept_maps/1
  def destroy
    @concept_map.destroy
    respond_to do |format|
      format.html { redirect_to concept_maps_url, notice: 'Concept map was successfully destroyed.' }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_concept_map
      @concept_map = ConceptMap.find(params[:id])
      if @concept_map.nil? || (@concept_map != @map && @concept_map.survey.project.user != @user)
        redirect_to '/'
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def concept_map_params
      params.fetch(:concept_map, {})
    end
end
