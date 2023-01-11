class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_locale
  before_action :check_login_frontend, except: %i[frontend backend login map_link map_form logout] #Logout hier drin lassen? Sonst: getrennte Actions?
  before_action :check_login_backend, except: %i[frontend backend login map_link map_form logout] #Logout hier drin lassen? Sonst: getrennte Actions?

  #GET '/'
  def frontend
    if session.has_key?(:student_id)
      # DH: Delete the student, if not already happened
      if Student.find_by_id(session[:student_id])
        Student.where(id: session[:student_id]).destroy_all
      end

      # DH: Inform the channel, that the student left
      ActionCable.server.broadcast(
        'test_channel',
        { action: 'user_left', user_id: session[:student_id], map_id: session[:map] }
      )

      #DH: Delete the session and cookie
      session.delete(:student_id)
      cookies.delete :student_id
      cookies.delete :map_id
    end
    render 'frontend', layout: 'login'
  end

  #GET '/backend'
  def backend
    render 'backend', layout: 'login'
  end

  #POST '/login'
  def login
    @user = User.find_user(params[:email], params[:password])
    unless @user.nil?
      session[:user] = @user.id
      redirect_to user_projects_path @user
    else
      redirect_to root_path, notice: (I18n.t('application.backend.wrong_credentials'))
    end
  end

  #GET '/logout'
  def logout
    # DH: Inform the channel
    ActionCable.server.broadcast(
      'test_channel',
      { action: 'user_left', user_id: cookies[:student_id], map_id: session[:map] }
    )

    #DH: delete the student after logout, so the names can be reused
    Student.where(id: cookies[:student_id]).destroy_all
    puts params[:target]

    #DH: Reset the session
    cookies[:student_id] = nil
    cookies[:map_id] = nil
    session[:student_id] = nil
    if params[:target] == 'frontend'
      @map = ConceptMap.find(session[:map])
      session[:map] = nil
      redirect_to '/', notice: (I18n.t('application.frontend.goodbye', code: @map.code))
    elsif params[:target] == 'backend'
      session[:user] = nil
      redirect_to root_path, notice: (I18n.t('application.backend.goodbye'))
    end
  end

  def send_code; end

  #GET /map/:code
  def map_link
    @map = ConceptMap.find_by_code(params[:code])
    if @map.nil?
      redirect_to '/'
    else
      session[:map] = @map.id
      redirect_to edit_concept_map_path @map
    end
  end

  #POST /map
  def map_form
    code = params[:code]

    # Check if there is already a session for the student
    if session.has_key?(:student_id)
      #Delete the student, if not already happened
      if Student.find_by_id(session[:student_id])
        Student.where(id: session[:student_id]).destroy_all
      end

      # DH: Inform the channel, that the user left
      ActionCable.server.broadcast(
        'test_channel',
        { action: 'user_left', user_id: session[:student_id], map_id: session[:map] }
      )

      #DH: Delete the session and cookie
      session.delete(:student_id)
      cookies.delete :student_id
    end

    # DH: Do the normal stuff
    unless code.nil? || code.blank?
      @map = ConceptMap.prepare_map(code) #Retrieve map or create a new one
      unless @map.nil?
        #If a map has been found or created => Save it to session hash and continue, else return to welcome screen
        session[:map] = @map.id
        redirect_to edit_concept_map_path @map
      else
        redirect_to '/', notice: (I18n.t('application.frontend.code_not_found'))
      end
    else
      render 'frontend', layout: 'login'
    end
  end

  private

  def set_locale
    if request.env['HTTP_ACCEPT_LANGUAGE'].nil?
      I18n.locale = :en
    else
      I18n.locale = request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
      I18n.locale = :en unless (I18n.locale == :de) || (I18n.locale == :en)
    end
  end

  def check_login_frontend

    if session.has_key?(:map)
      @map = ConceptMap.find(session[:map])
    elsif params.has_key?(:code)
      @map = ConceptMap.find_by_code(params[:code])
    else 
      redirect_to '/'
    end

    if @map.nil?
      redirect_to '/'
    end
   
    # DH: Set the current student
    @current_student = current_student
    # Check if the student reloaded the browser
    if @current_student == 'reload'
      # DH: Redircet the student
      redirect_to '/'
    else
      if @current_student
        # DH: The student is valid
        cookies[:student_id] = @current_student.id
        cookies[:map_id] = @map.id
        # DH: Get all students from this Map
        @student = Student.where('concept_map_id = ?', @map.id)
      else
        # DH: student can't join. All colors are given away
        redirect_to '/', notice: (I18n.t('application.frontend.full', code: @map.code))
      end      
    end
  end

  helper_method :current_student

  def current_student
    return @current_student if @current_student.present?

    if session[:student_id].present?
      @current_student = Student.find_by_id(session[:student_id])

      if @current_student
        return @current_student
      else
        return 'reload'
      end
    end

    @student = Student.where('concept_map_id = ?', @map.id)

    # DH: At the moment 20 users are allowed, need to be changed here if the number changes!
    while @student.count < 20
      @current_student = Student.generate(@map.id)
      if @current_student.id
        session[:student_id] = @current_student.id
        ActionCable.server.broadcast(
          'test_channel',
          {
            action: 'user_joined',
            user: @current_student.name,
            user_color: @current_student.color,
            user_id: @current_student.id,
            map_id: @map.id
          }
        )
        return @current_student
      end

      return false
    end
  end

  def check_login_backend
    if session.has_key?(:user)
      @login = User.find(session[:user])
    else
      redirect_to root_path
    end
  end
end
