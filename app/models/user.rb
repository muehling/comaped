class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  has_secure_password

  has_many :projects, dependent: :destroy

  #Search for a user with the given credentials and return it
  #Params:
  # email: The email of the user
  # password: The password of the user
  #Effect: -
  #Returns: The user object with the given credentials or nil if none is found
  def self.find_user(email, password)
    user = User.find_by_email(email)
    if !user.nil? && user.authenticate(password)
      return user
    else
      return nil
    end
  end
end
