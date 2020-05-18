class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel_#{params[:room]}"
  end

  def speak(data)
    message = Message.create(
      body: data['message'],
      sender: current_user,
      receiver_id: data['receiver_id'],
      trade_request_id: data['trade_request_id']
    )
    message_hash = { body: message.body, id: message.id, sender_id: current_user.id }
    socket = { messages: [message_hash], type: 'message' }
    ActionCable.server.broadcast("chat_channel_#{params[:room]}", socket)
  end

  def load(data)
    messages = Message.where(trade_request_id: data['trade_request_id']).collect do |message|
      { body: message.body, id: message.id, sender_id: message.sender_id }
    end
    socket = { messages: messages, type: 'messages' }
    ActionCable.server.broadcast("chat_channel_#{params[:room]}", socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
