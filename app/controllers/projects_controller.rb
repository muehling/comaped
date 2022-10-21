class ProjectsController < ApplicationController
  before_action :set_user
  before_action :set_project, only: %i[show edit update destroy]
  skip_before_action :check_login_frontend

  layout 'backend'

  # GET /projects
  def index
    @projects = @user.projects.order(created_at: :desc)
  end

  # GET /projects/1
  # GET /projects/1.text
  # GET /projects/1.json
  def show
    @surveys = @project.surveys.order(created_at: :desc)
    respond_to do |format|
      format.html {}
      format.text do
        if params.has_key?(:versions)
          send_file @project.to_zip(true, true),
                    filename: @project.name + '.zip',
                    type: 'application/zip'
        else
          send_file @project.to_zip(true, false),
                    filename: @project.name + '.zip',
                    type: 'application/zip'
        end
      end
      format.json do
        if params.has_key?(:versions)
          send_file @project.to_zip(false, true),
                    filename: @project.name + '.zip',
                    type: 'application/zip'
        else
          send_file @project.to_zip(false, false),
                    filename: @project.name + '.zip',
                    type: 'application/zip'
        end
      end
    end
  end

  # GET /projects/new.html
  def new
    @project = Project.new
    if params['import'].nil?
      render 'create_project'
    else
      render 'import_project'
    end
  end

  def import; end

  # GET /projects/1/edit.html
  def edit; end

  # POST /projects.html
  def create
    # create project from form inputs
    if params.has_key?(:project) && params[:project][:file].nil?
      @project = @user.projects.build(project_params)
      if @project.save
        redirect_to user_project_path(@user, @project)
      else
        render :new
      end
      return
    end

    # create projects from input file(s)
    if params.has_key?(:project) && !params[:project][:file].nil?
      res = true
      params[:project][:file].each do |f|
        @project = @user.projects.build
        res = res && @project.import_file(f.tempfile)
      end
    end

    if res
      if params[:project][:file].size == 1
        redirect_to user_project_path(@user, @project), notice: I18n.t('projects.imported')
      else
        redirect_to user_projects_path(@user), notice: I18n.t('projects.imported')
      end
    else
      redirect_to user_projects_path(@user), notice: I18n.t('error_import')
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      redirect_to user_project_path(@user, @project)
    else
      render edit_user_project_path(@user, @project), notice: I18n.t('error')
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    redirect_to user_projects_path(@user), notice: I18n.t('projects.destroyed'), status: :see_other
  end

  private

  # Use callbacks to share common setup or constraints between actions.

  def set_user
    @user = User.find(params[:user_id])
    redirect_to root_path if @user.nil? || (@user.id != @login.id && !@login.admin?)
  end

  def set_project
    @project = Project.find(params[:id])
    redirect_to root_path if @project.nil? || (@project.user != @user)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def project_params
    params.fetch(:project, {}).permit(%i[name description enable_coworking])
  end
end
