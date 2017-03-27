class UsersController < ApplicationController
  before_action :is_allowed, only: [:create, :index, :destroy]
  before_action :set_user, only: [:edit, :update, :destroy, :show]
  skip_before_action :check_login_frontend

  layout 'backend'

  # GET /users
  def index
    @users = User.all
  end

  # GET /users/1
  def show
  end

  # GET /users/new
  def new
    @u = User.new
    render :edit
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  def create
    @u = User.new(user_params)

    respond_to do |format|
      if @u.save
        format.html { redirect_to @u, notice: I18n.t('users.created') }
      else
        format.html { render :edit }
      end
    end
  end

  # PATCH/PUT /users/1
  def update
    respond_to do |format|
      if @u.update(user_params)
        format.html { redirect_to @u, notice: I18n.t('users.updated') }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /users/1
  def destroy
    @u.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: I18n.t('users.destroyed') }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def is_allowed
      unless @user.id == 1
        redirect_to '/backend'
      end
    end

    def set_user
      @u = User.find(params[:id])
      if @u.nil? || (@u.id != @user.id && @user.id != 1)
        redirect_to '/backend'
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.fetch(:user, {}).permit([:email, :password, :password_confirmation])
    end
end
