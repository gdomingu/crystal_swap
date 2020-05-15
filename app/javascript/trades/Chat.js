import React, { useState, useEffect } from "react";
import MessageForm from "./MessageForm";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [chatChannel, setchatChannel] = useState(null);

  useEffect(() => {
    CableApp.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: function (data) {
          setMessages((prevMessages) => [...prevMessages, data]);
        },
        speak: function (data) {
          data["trade_request_id"] = props.tradeRequestId;
          return this.perform("speak", data);
        },
        initialized: function () {
          setchatChannel(this);
        },
      }
    );
    return () => {};
  }, []);
  const messageList = messages.map((message) => {
    return (
      <li key={message.id}>
        {message.body}
        <div />
      </li>
    );
  });
  return (
    <div className="chatroom-container">
      <div>ChatRoom</div>
      <div className="message-list">{messageList}</div>
      <MessageForm chatChannel={chatChannel} userId={props.userId} />
    </div>
  );
};

export default Chat;
