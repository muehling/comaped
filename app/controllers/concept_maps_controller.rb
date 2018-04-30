class ConceptMapsController < ApplicationController

  skip_before_action :check_login_frontend, except: [:edit]
  skip_before_action :check_login_backend, only: [:edit, :show, :update]
  before_action :login_for_show, only: [:show]
  before_action :set_user_project_survey, only: [:new, :create, :destroy, :index]
  before_action :set_concept_map, only: [:edit, :update, :show, :destroy]

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

  def update
      if @concept_map.update(concept_map_params)
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
    respond_to do |format|
      format.js {
      }
      format.zip {
        @concept_map = ConceptMap.new
        render 'import.js.erb', content_type: Mime::JS
      }
    end
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
    respond_to do |format|
      format.js {
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
      }
      format.html {
        if params.has_key?(:concept_map) && !params[:concept_map][:file].nil?
          res = true
          params[:concept_map][:file].each do |f|
            @concept_map = @survey.concept_maps.build
            res = res && @concept_map.import_file(f.tempfile, f.original_filename.split('.')[0])
          end
        end
        if res
          if params[:concept_map][:file].size == 1
            redirect_to user_project_survey_concept_map_path(@user, @project, @survey, @concept_map), notice: I18n.t('concept_maps.imported')
          else
            redirect_to user_project_survey_concept_maps_path(@user, @project, @survey), notice: I18n.t('concept_maps.imported')
          end
        else
          redirect_to user_project_survey_concept_maps_path(@user, @project, @survey), notice: I18n.t('error_import')
        end
      }
    end

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
      if concept_map_params.has_key?(:data)&&(concept_map_params[:data].has_key?(:background_color)||concept_map_params[:data].has_key?(:legend)) && !@concept_map.nil?&&concept_map_params[:data].keys.size==1
        puts("haloo")
      elsif @concept_map.nil? || (@concept_map != @map && @concept_map.survey.project.user != @user)
        redirect_to '/'
      end
    end

    def set_user_project_survey
      @user = User.find(params[:user_id])
      if @user.nil? || (@user.id != @login.id &&  !@login.admin?)
        redirect_to '/backend'
      end
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
    if params.has_key?(:project_id)
      check_login_backend
      set_user_project_survey
    else
        check_login_frontend
    end
  end
  # Never trust parameters from the scary internet, only allow the white list through.
  def concept_map_params
    params.fetch(:concept_map, {}).permit(:data=>[:background_color, :legend=>[:a, :b, :c, :d, :e, :f, :g,:h]])
  end
end
