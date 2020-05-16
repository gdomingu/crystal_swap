class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def speak(data)
    message = Message.create(
      body: data['message'],
      sender: current_user,
      receiver_id: data['receiver_id'],
      trade_request_id: data['trade_request_id']
    )
    socket = { body: message.body, id: message.id, sender_id: current_user.id }
    ActionCable.server.broadcast("chat_channel", socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
