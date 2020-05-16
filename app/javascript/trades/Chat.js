import React, { useState, useEffect } from "react";
import MessageForm from "./MessageForm";
import Chip from "@material-ui/core/Chip";
import { UserContext } from "../context/UserContext";

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
  const flexDir = (currentUser, message) => {
    return message.sender_id == currentUser.id ? "flex-end" : "flex-start";
  };
  const messageList = messages.map((message) => {
    return (
      <UserContext.Consumer key={message.id}>
        {(value) => {
          return (
            <div
              style={{
                justifyContent: flexDir(value, message),
                display: "flex",
              }}
            >
              <Chip size="small" label={message.body} />
            </div>
          );
        }}
      </UserContext.Consumer>
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
