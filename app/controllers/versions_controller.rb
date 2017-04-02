class VersionsController < ApplicationController
  skip_before_action :check_login_frontend

  before_action :set_version_and_check

  #GET /concept_maps/1/version/1.js
  def show
  end


  #DELETE /concept_maps/1/version/1
  def destroy
    last = @concept_map.versions.last
    @concept_map.versions.clear
    @concept_map.versions.reload
    @concept_map.versions.build(map: last.map, created_at: last.created_at)
    @concept_map.save
    redirect_to user_project_survey_concept_map_path(@concept_map.survey.project.user, @concept_map.survey.project, @concept_map.survey, @concept_map)
  end

  private

  def set_version_and_check
    @concept_map = ConceptMap.find(params[:concept_map_id])
    if @concept_map.nil? || (@concept_map.survey.project.user != @login && !@login.admin?)
      redirect_to '/backend'
    end
    @version = @concept_map.versions[params[:id].to_i]
    if @version.nil?
      redirect_to '/backend'
    end
  end
end
