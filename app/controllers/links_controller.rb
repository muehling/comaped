class LinksController < ApplicationController

  skip_before_action :check_login_backend
  before_action :set_concept_map
  before_action :set_link, only: [:edit, :update, :destroy]

  # POST /concept_maps/1/links
  def create
    @link = @map.links.build(label: link_params[:label], start_id: link_params[:start_id].to_i, end_id: link_params[:end_id].to_i, arrows: link_params[:arrows])
    if @link.save
      @map.versionize(DateTime.now)
    end
  end

  # PATCH/PUT /concept_maps/1/links/1
  def update
    if @link.update(link_params.permit(:label, :arrows))
      @map.versionize(DateTime.now)
    end
    render :create
  end

  # DELETE /concept_maps/1/links/1
  def destroy
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
    params.require(:link).permit([:label, :start_id, :end_id, :arrows])
  end

end
