class ConceptMapsController < ApplicationController
  before_action :set_concept_map, only: [:edit, :update, :show, :destroy]
  before_action :set_project_survey, only: [:show, :new, :create, :destroy]
  skip_before_action :check_login_frontend, except: [:edit]
  skip_before_action :check_login_backend, only: [:edit]

  # GET /concept_maps/1
  # GET /concept_maps/1.text
  # GET /concept_maps/1.json
  def show
    respond_to do |format|
      format.html {}
      format.json {
        if params.has_key?(:versions)
          send_file @concept_map.to_zip(false), filename:@concept_map.code+".zip", type: "application/zip"
        else
          send_data @concept_map.to_json, filename: @concept_map.code+".json", type: :json
        end
      }
      format.text {
        if params.has_key?(:versions)
          send_file @concept_map.to_zip(true), filename:@concept_map.code+".zip", type: "application/zip"
        else
          send_data @concept_map.to_tgf, filename: @concept_map.code+".tgf", type: :text
        end
      }
    end
  end

  # GET /concept_maps/new
  def new
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
    res = I18n.t('error')
    if params[:type] == "simple"
      count = params[:number].to_i || 0
      res = I18n.t('concept_maps.create') + ":<br/>"
      count.times do
        cm = @survey.concept_maps.build
        cm.save
        res = res + cm.code + "<br/>"
      end
    else
      if params[:type] == "email"
        list = params[:email]
        codes = []
        list.split("\n").each do |email|
          cm = @survey.concept_maps.build
          cm.save
          codes = codes + [[email, cm.code]]
        end
        res = I18n.t('concept_maps.create') + ":<br/>"
        if (params[:anonymized] == '1')
          codes.map{|x| x[1]}.sort.each do |c|
            res = res + c + "<br/>"
          end
        else
          res = res + "<table class='table table-condensed' style='width: auto'><tbody>"
          codes.each do |c|
            res = res + "<tr><td>" + c[1] + "</td><td>" + c[0] + "</td></tr>"
          end
          res = res + "</tbody></table>"
        end
      end
    end
    redirect_to user_project_survey_path(@user, @project, @survey), notice: res
  end

  # DELETE /concept_maps/1
  def destroy
    @concept_map.destroy
    redirect_to user_project_survey_path(@user, @project, @survey)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_concept_map
      @concept_map = ConceptMap.find(params[:id])
      if @concept_map.nil? || (@concept_map != @map && @concept_map.survey.project.user != @user)
        redirect_to '/'
      end
    end

    def set_project_survey
      @project = Project.find(params[:project_id])
      unless !@project.nil? && @project.user == @user
        redirect_to '/backend'
      else
        @survey = Survey.find(params[:survey_id])
        unless !@survey.nil? && @survey.project == @project
          redirect_to '/backend'
        end
      end
    end

end
