class TestChannel < ApplicationCable::Channel
  def subscribed
    # Start the streaming from the channel
    stream_from "test_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
