import React, { useState, useEffect } from "react";
import MessageForm from "./MessageForm";
import actioncable from "actioncable";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [chatChannel, setchatChannel] = useState();

  useEffect(() => {
    const cable = actioncable.createConsumer("ws://localhost:3000/cable");
    let channel = cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: (data) => {
          setMessages(messages.concat(data));
        },
        speak: function (data) {
          data["trade_request_id"] = props.tradeRequestId;
          return this.perform("speak", data);
        },
      }
    );
    setchatChannel(channel);
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
