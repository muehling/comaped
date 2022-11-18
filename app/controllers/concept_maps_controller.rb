class ConceptMapsController < ApplicationController
  skip_before_action :check_login_frontend, except: %i[edit update]
  skip_before_action :check_login_backend, only: %i[edit show update]
  before_action :login_for_show, only: [:show]
  before_action :set_user_project_survey, only: %i[new create destroy index page]
  before_action :set_concept_map, only: %i[edit update show destroy]

  # GET /concept_maps/

  def index
    @page = params[:page].to_i || 0
    @maps = @survey.concept_maps.offset(@page * 10).limit(10).order(updated_at: :desc)
    respond_to do |format|
      format.html { head :ok if @maps.size == 0 }
      format.json {}
    end
  end

  # GET /concept_maps/
  # will render the partial without a layout; used for scroll-loading
  def page
    @page = params[:page].to_i || 0
    @maps = @survey.concept_maps.offset(@page * 10).limit(10).order(updated_at: :desc)
    if @maps.size == 0
      head :ok
      return
    end
    render layout: false
  end

  # GET /concept_maps/1
  # GET /concept_maps/1.text
  # GET /concept_maps/1.json
  def show
    respond_to do |format|
      format.html { render 'show', layout: 'backend' }
      format.json do
        if params.has_key?(:versions)
          send_file @concept_map.to_zip(false),
                    filename: @concept_map.code + '.zip',
                    type: 'application/zip'
        else
          send_data @concept_map.to_json, filename: @concept_map.code + '.json', type: :json
        end
      end
      format.text do
        if params.has_key?(:email)
          ConceptMapMailer.edited(params[:email], @map.code).deliver_later
          head :ok
        else
          if params.has_key?(:versions)
            send_file @concept_map.to_zip(true),
                      filename: @concept_map.code + '.zip',
                      type: 'application/zip'
          else
            send_data @concept_map.to_tgf, filename: @concept_map.code + '.tgf', type: :text
          end
        end
      end
    end
  end

  # GET /concept_maps/new
  def new
    if params['import'].nil?
      render 'create_concept_map', layout: 'backend'
    else
      @concept_map = ConceptMap.create
      render 'import_concept_map', layout: 'backend'
    end
  end

  # PUT /concept_maps/1
  def update
    if !@concept_map.update(concept_maps_params)
      render error: { error: 'unable to update' }, status: 400
    end
  end

  # GET /concept_maps/1/edit
  def edit
    # project is needed to check whether coworking is enabled
    survey = Survey.find_by_id(@concept_map.survey_id)
    @project = Project.find_by_id(survey.project_id)

    @concept_map.accesses = 0 if @concept_map.accesses.nil?
    @concept_map.accesses = @concept_map.accesses + 1
    @concept_map.save

    # if concepts were added to the survey preset after creation,
    # and the map is still untouched, insert them now
    @concept_map.after_create if !@concept_map.has_concepts && !survey.initial_map.blank?

    render 'edit'
  end

  # POST /concept_maps
  def create
    if params.has_key?(:number) || params.has_key?(:email)
      res = I18n.t('error')
      if params[:type] == 'simple'
        # create number of concept maps
        count = params[:number].to_i || 0
        res = I18n.t('concept_maps.create') + ':<br/>'
        count.times do
          cm = @survey.concept_maps.build
          cm.save
          res = res + cm.code + '<br/>'
        end
      else
        # create concepts maps and mail them
        if params[:type] == 'email'
          anonymous = params[:anonymized] == '1'
          list = params[:email]
          codes = []
          list
            .split("\n")
            .each do |email|
              cm = @survey.concept_maps.build
              cm.save
              codes = codes + [[email, cm.code]]
              ConceptMapMailer.created(email, cm.code, anonymous).deliver_later
            end
          res = I18n.t('concept_maps.create') + ':<br/>'
          if (anonymous)
            codes.map { |x| x[1] }.sort.each { |c| res = res + c + '<br/>' }
          else
            res = res + "<table class='table table-condensed' style='width: auto'><tbody>"
            codes.each { |c| res = res + '<tr><td>' + c[1] + '</td><td>' + c[0] + '</td></tr>' }
            res = res + '</tbody></table>'
          end
        end
      end
      redirect_to user_project_survey_path(@user, @project, @survey), notice: res
      return
    end

    # import concept maps
    if params.has_key?(:concept_map) && !params[:concept_map][:file].nil?
      res = true
      params[:concept_map][:file].each do |f|
        @concept_map = @survey.concept_maps.build
        res = res && @concept_map.import_file(f.tempfile, f.original_filename.split('.')[0])
      end
    end
    if res
      if params[:concept_map][:file].size == 1
        redirect_to user_project_survey_concept_map_path(@user, @project, @survey, @concept_map),
                    notice: I18n.t('concept_maps.imported')
      else
        redirect_to user_project_survey_path(@user, @project, @survey),
                    notice: I18n.t('concept_maps.imported')
      end
    else
      redirect_to user_project_survey_concept_maps_path(@user, @project, @survey),
                  notice: I18n.t('error_import')
    end
  end

  # DELETE /concept_maps/1
  def destroy
    @concept_map.destroy
    redirect_to user_project_survey_path(@user, @project, @survey)
  end

  private

  #Load concept maps and check whether user is allowed to access it (frontend or backend)
  def set_concept_map
    @concept_map = ConceptMap.find_by_code(params[:code])
    if @concept_map.nil? || (@concept_map != @map && @concept_map.survey.project.user != @user)
      redirect_to '/'
    end
  end

  def set_user_project_survey
    @user = User.find(params[:user_id])
    redirect_to root_path if @user.nil? || (@user.id != @login.id && !@login.admin?)
    @project = Project.find(params[:project_id])
    if @project.nil? || (@project.user != @user && !@login.admin?)
      redirect_to root_path
    else
      @survey = Survey.find(params[:survey_id])
      redirect_to root_path if @survey.nil? || @survey.project != @project
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

  def concept_maps_params
    params.require(:concept_map).permit([concepts_attributes: %i[id label shape color x y lock]])
  end
end
