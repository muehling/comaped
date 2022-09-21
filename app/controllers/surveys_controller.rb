class SurveysController < ApplicationController
  before_action :set_user_project
  before_action :set_survey, only: [:show, :edit, :update, :destroy]
  skip_before_action :check_login_frontend

  layout 'backend'

  # GET /surveys
  def index
    @surveys = @project.surveys.order(created_at: :desc)
  end

  # GET /surveys/1
  # GET /surveys/1.text
  # GET /surveys/1.json
  def show
    respond_to do |format|
      format.html {
        @maps = @survey.concept_maps.limit(10).order(updated_at: :desc)
        @page = 0
      }
      format.text {
        if params.has_key?(:versions)
          send_file @survey.to_zip(true, true), filename: @survey.name+".zip", type: "application/zip"
        else
          send_file @survey.to_zip(true, false), filename: @survey.name+".zip", type: "application/zip"
        end
      }
      format.json {
        if params.has_key?(:versions)
          send_file @survey.to_zip(false, true), filename: @survey.name+".zip", type: "application/zip"
        else
          send_file @survey.to_zip(false, false), filename: @survey.name+".zip", type: "application/zip"
        end
      }
    end
  end

  # GET /surveys/new.js
  def new
    @survey = Survey.new
    if params['import'].nil?
      render "create_survey"
    else
      render "import_survey"
    end
  end

  # GET /surveys/1/edit.js
  def edit
    if params[:detail].nil?
      render 'edit'
    else
      render 'edit_detail'
    end
  end

  # POST /surveys
  def create
    # no file was passed -> create from form input
    if params.has_key?(:survey) && params[:survey][:file].nil?
      @survey = @project.surveys.build(survey_params)
      logger.info @survey.inspect
      if @survey.save
        redirect_to user_project_survey_path(@user, @project, @survey)
      else
        render :new
      end
      return
    end

    # one or more files were passed -> import
    if params.has_key?(:survey) && !params[:survey][:file].nil?
      res = true
      params[:survey][:file].each do |f|
        @survey = @project.surveys.build
        res = res && @survey.import_file(f.tempfile)
      end
    end
    if res
      if params[:survey][:file].size == 1
        redirect_to user_project_survey_path(@user, @project, @survey), notice: I18n.t('surveys.imported')
      else
        redirect_to user_project_path(@user, @project), notice: I18n.t('surveys.imported')
      end
    else
      redirect_to user_project_surveys_path(@user, @project), notice: I18n.t('error_import')
    end
  end

  # PATCH/PUT /surveys/1
  def update
    if @survey.update(survey_params)
      redirect_to user_project_survey_path(@user, @project, @survey)
    else
      redirect_to edit_user_project_survey_path(@user, @project, @survey), notice: I18n.t('error')
    end
  end

  # DELETE /surveys/1
  def destroy
    @survey.destroy
    redirect_to user_project_surpath(@user, @project), notice: I18n.t('surveys.destroyed'), status: :see_other
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_survey
      @survey = Survey.find(params[:id])
      if @survey.nil? || @survey.project != @project
        redirect_to '/backend'
      end
    end

    def set_user_project
      @user = User.find(params[:user_id])
      if @user.nil? || (@user.id != @login.id &&  !@login.admin?)
        redirect_to '/backend'
      end
      @project = Project.find(params[:project_id])
      if @project.nil? || (@project.user != @user && !@user.admin?)
        redirect_to '/backend'
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def survey_params
      params.fetch(:survey, {}).permit([:name, :description, :code, :start_date, :end_date, :introduction, :concept_labels, :association_labels, :initial_map])
    end
end
