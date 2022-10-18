class UsersController < ApplicationController
  before_action :is_allowed, only: %i[create index new]
  before_action :set_user, only: %i[edit update destroy show]
  skip_before_action :check_login_frontend

  layout 'backend'

  # GET /users
  def index
    @users = User.all
  end

  # GET /users/1
  def show; end

  # GET /users/new
  def new
    @user = User.new
    render :edit
  end

  # GET /users/1/edit
  def edit; end

  # POST /users
  def create
    p = user_params
    if p[:password].blank?
      p[:password] = ConceptMap.generate_slug
      p[:password_confirmation] = p[:password]
    end
    @user = User.new(p)

    respond_to do |format|
      if @user.save
        UserMailer.created(@user.email, p[:password]).deliver_later
        format.html { redirect_to users_path, notice: I18n.t('users.created') }
      else
        format.html { render :edit }
      end
    end
  end

  # PATCH/PUT /users/1
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: I18n.t('users.updated') }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    respond_to { |format| format.html { redirect_to users_url, notice: I18n.t('users.destroyed') } }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def is_allowed
    redirect_to root_path if !@login.admin?
  end

  def set_user
    @user = User.find(params[:id])
    redirect_to root_path if @user.nil? || (@user.id != @login.id && !@login.admin?)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    if @login.admin?
      params.fetch(:user, {}).permit(%i[email password password_confirmation capabilities])
    else
      params.fetch(:user, {}).permit(%i[email password password_confirmation])
    end
  end
end
