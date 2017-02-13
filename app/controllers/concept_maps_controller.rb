class ConceptMapsController < ApplicationController
  before_action :set_concept_map, only: [:show, :edit, :update, :destroy]
  skip_before_action :check_login_frontend, only: [:show, :index, :destroy, :create]
  skip_before_action :check_login_backend, except: [:show, :index, :destroy, :create]

  layout 'frontend'

  # GET /concept_maps
  # GET /concept_maps.json
  def index
    @concept_maps = ConceptMap.all
  end

  # GET /concept_maps/1
  # GET /concept_maps/1.json
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
  # POST /concept_maps.json
  def create
    @concept_map = ConceptMap.new(concept_map_params)

    respond_to do |format|
      if @concept_map.save
        format.html { redirect_to @concept_map, notice: 'Concept map was successfully created.' }
        format.json { render :show, status: :created, location: @concept_map }
      else
        format.html { render :new }
        format.json { render json: @concept_map.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /concept_maps/1
  # PATCH/PUT /concept_maps/1.json
  def update
    respond_to do |format|
      if @concept_map.update(concept_map_params)
        format.html { redirect_to @concept_map, notice: 'Concept map was successfully updated.' }
        format.json { render :show, status: :ok, location: @concept_map }
      else
        format.html { render :edit }
        format.json { render json: @concept_map.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /concept_maps/1
  # DELETE /concept_maps/1.json
  def destroy
    @concept_map.destroy
    respond_to do |format|
      format.html { redirect_to concept_maps_url, notice: 'Concept map was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_concept_map
      @concept_map = ConceptMap.find(params[:id])
      if @concept_map.nil? || @concept_map != @map
        redirect_to '/'
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def concept_map_params
      params.fetch(:concept_map, {})
    end
end
