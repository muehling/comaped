class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_locale
  before_action :check_login_frontend, except: [:frontend, :backend, :login, :logout]  #Logout hier drin lassen? Sonst: getrennte Actions?
  before_action :check_login_backend, except: [:frontend, :backend, :login, :logout]   #Logout hier drin lassen? Sonst: getrennte Actions?

  #GET '/'
  def frontend
    render 'frontend', layout: 'login'
  end

  #GET '/backend'
  def backend
    render 'backend', layout: 'login'
  end

  #POST '/login'
  def login
    if params[:target] == 'frontend'
      code = params[:code]
      unless code.nil? || code.blank?
        @map = ConceptMap.prepare_map(code) #Retrieve map or create a new one
        unless @map.nil?               #If a map has been found or created => Save it to session hash and continue, else return to welcome screen
          session[:map] = @map.id
          redirect_to edit_concept_map_path @map
        else
          redirect_to '/', notice: (I18n.t('application.frontend.code_not_found'))
        end
      else
        render 'frontend', layout: 'login'
      end
    elsif params[:target] == 'backend'
      @user = User.find_user(params[:email], params[:password])
      unless @user.nil?
        session[:user] = @user.id
        redirect_to user_projects_path @user
      else
        redirect_to '/backend', notice: (I18n.t('application.backend.wrong_credentials'))
      end
    end
  end

  #GET '/logout'
  def logout
    puts params[:target]
    if params[:target] == 'frontend'
      @map = ConceptMap.find(session[:map])
      session[:map] = nil
      redirect_to '/', notice: (I18n.t('application.frontend.goodbye', code: @map.code))
    elsif params[:target] == 'backend'
      session[:user] = nil
      redirect_to '/backend', notice: (I18n.t('application.backend.goodbye'))
    end
  end

  private

  def set_locale
    if request.env['HTTP_ACCEPT_LANGUAGE'].nil?
      I18n.locale = :en
    else
      I18n.locale = request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
      unless (I18n.locale == :de) || (I18n.locale == :en)
        I18n.locale = :en
      end
    end
  end

  def check_login_frontend
    if session.has_key?(:map)
      @map = ConceptMap.find(session[:map])
    else
      redirect_to '/'
    end
  end

  def check_login_backend
    if session.has_key?(:user)
      @user = User.find(session[:user])
    else
      redirect_to '/backend'
    end
  end
end
