module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # the current user identifies the Connection
    identified_by :current_student

    def connect
      @current_user_id = cookies[:student_id]
      @map_id = cookies[:map_id]
    end

    def disconnect
      Student.destroy(@current_user_id)
      ActionCable.server.broadcast(
        'test_channel',
        { action: 'user_left', user_id: @current_user_id, map_id: @map_id }
      )
    end
  end
end
