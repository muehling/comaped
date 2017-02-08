class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  skip_before_action :check_login_frontend

  layout 'backend'

  # GET /projects
  def index
    @projects = @user.projects.order(created_at: :desc)
  end

  # GET /projects/1
  # GET /projects/1.zip
  def show
    @surveys = @project.surveys.order(created_at: :desc)
    respond_to do |format|
      format.html {}
      format.zip {
        send_file @project.export_zip(true), :filename => "#{@project.name}.zip", :type=>"application/zip"
      }
    end
  end

  # GET /projects/new.js
  def new
    @project = Project.new
  end

  # GET /projects/1/edit.js
  def edit
  end

  # POST /projects.js
  def create
    @project = @user.projects.build(project_params)
    respond_to do |format|
      if @project.save
        format.js { redirect_to user_project_path(@user, @project), notice: I18n.t('projects.created')}
        #format.json { render :show, status: :created, location: @project }
      else
        format.js { render :new }
        #format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1.js
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.js { }
 #       format.json { render :show, status: :ok, location: @project }
      else
        format.js { render :edit }
 #       format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    respond_to do |format|
      format.html { redirect_to user_projects_path(@user), notice: I18n.t('projects.destroyed')}
     # format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
      unless !@project.nil? && @project.user == @user
        redirect_to '/backend'
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.fetch(:project, {}).permit([:name, :description])
    end
end
