module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # the current user identifies the Connection
    identified_by :current_student
  end
end

# Another way to handle the disconnection of the internet / mobile users.
# Regarding
#module ApplicationCable
#  class Channel < ActionCable::Channel::Base
#    after_subscribe :connection_monitor
#    CONNECTION_TIMEOUT = 10.seconds
#    CONNECTION_PING_INTERVAL = 5.seconds
#    periodically every: CONNECTION_PING_INTERVAL do
#      @driver&.ping
#      if Time.now - @_last_request_at > @_timeout
#        connection.disconnect
#      end
#    end
#    def connection_monitor
#      @_last_request_at ||= Time.now
#      @_timeout = CONNECTION_TIMEOUT
#      @driver = connection.instance_variable_get('@websocket').possible?&.instance_variable_get('@driver')
#      @driver.on(:pong) { @_last_request_at = Time.now }
#    end
#  end
#end
