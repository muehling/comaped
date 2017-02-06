class SurveysController < ApplicationController
  before_action :set_project
  before_action :set_survey, only: [:show, :edit, :update, :destroy]
  skip_before_action :check_login_frontend

  layout 'backend'

  # GET /surveys
  def index
    @surveys = @project.surveys.order(created_at: :desc)
  end

  # GET /surveys/1
  # GET /surveys/1.zip
  def show
    respond_to do |format|
      format.html {}
      format.zip {
        send_file @survey.export_zip(true), :filename => "#{@survey.name}.zip", :type=>"application/zip"
      }
    end
  end

  # GET /surveys/new.js
  def new
    @survey = Survey.new
  end

  # GET /surveys/1/edit.js
  def edit
  end

  # POST /surveys
  def create
    @survey = @project.surveys.build(survey_params)

    respond_to do |format|
      if @survey.save
        format.js { redirect_to user_project_path(@user, @project), notice: I18n.t('survey.created')}
#        format.json { render :show, status: :created, location: @survey }
      else
        format.js { render :new }
#        format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /surveys/1.js
  def update
    respond_to do |format|
      if @survey.update(survey_params)
        format.js{}
 #       format.json { render :show, status: :ok, location: @survey }
      else
        format.js { render :edit }
  #      format.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /surveys/1
  def destroy
    @survey.destroy
    respond_to do |format|
      format.html { redirect_to user_project_path(@user, @project), notice: I18n.t('survey.destroyed') }
 #     format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_survey
      @survey = Survey.find(params[:id])
      unless !@survey.nil? && @survey.project == @project
        redirect_to '/backend'
      end
    end

    def set_project
      @project = Project.find(params[:project_id])
      unless !@project.nil? && @project.user == @user
        redirect_to '/backend'
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def survey_params
      params.fetch(:survey, {}).permit([:name, :description, :code, :start_date, :end_date, :introduction, :concept_labels, :association_labels, :initial_map])
    end
end
