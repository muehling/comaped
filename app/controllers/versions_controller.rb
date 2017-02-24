class VersionsController < ApplicationController
  skip_before_action :check_login_frontend

  before_action :set_version_and_check

  #GET /concept_maps/1/version/1.js
  def show
  end

  private

  def set_version_and_check
    @concept_map = ConceptMap.find(params[:concept_map_id])
    unless !@concept_map.nil? && @concept_map.survey.project.user == @user
      redirect_to '/backend'
    end
    @version = @concept_map.versions[params[:id].to_i]
    if @version.nil?
      redirect_to '/backend'
    end
  end
end
