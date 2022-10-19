module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # the current user identifies the Connection
    identified_by :current_student
  end
end
