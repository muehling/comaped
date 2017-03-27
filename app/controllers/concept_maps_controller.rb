class ConceptMapsController < ApplicationController

  skip_before_action :check_login_frontend, except: [:edit]
  skip_before_action :check_login_backend, only: [:edit, :show]
  before_action :login_for_show, only: [:show]
  before_action :set_concept_map, only: [:edit, :update, :show, :destroy]
  before_action :set_project_survey, only: [:new, :create, :destroy, :index]


  # GET /concept_maps/:page.js

  def index
    @page = params[:page].to_i || 0
    @maps = @survey.concept_maps.offset(@page*10).limit(10).order(updated_at: :desc)
    respond_to do |format|
      format.js {
        if @maps.size == 0
          head :ok
        end
      }
    end
  end

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
        if params.has_key?(:email)
          ConceptMapMailer.edited(params[:email], @map.code).deliver_later
          head :ok
          else
            if params.has_key?(:versions)
              send_file @concept_map.to_zip(true), filename:@concept_map.code+".zip", type: "application/zip"
            else
              send_data @concept_map.to_tgf, filename: @concept_map.code+".tgf", type: :text
            end
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
        anonymous = params[:anonymized] == '1'
        list = params[:email]
        codes = []
        list.split("\n").each do |email|
          cm = @survey.concept_maps.build
          cm.save
          codes = codes + [[email, cm.code]]
          ConceptMapMailer.created(email, cm.code, anonymous).deliver_later
        end
        res = I18n.t('concept_maps.create') + ":<br/>"
        if (anonymous)
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
      if @project.nil? || @project.user != @user
        redirect_to '/backend'
      else
        @survey = Survey.find(params[:survey_id])
        if @survey.nil? || @survey.project != @project
          redirect_to '/backend'
        end
      end
    end

  def login_for_show
    if params.has_key?(:prohect_id)
      check_login_backend
      set_project_survey
    else
        check_login_frontend
    end
  end

end
