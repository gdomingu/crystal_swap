import React, { useState, useEffect, useRef } from "react";
import MessageForm from "./MessageForm";
import { UserContext } from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import ChatBubble from "../components/ChatBubble";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
    display: "flex",
    height: "100%",
    flexDirection: "column",
    overflowY: "scroll",
  },
  chip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    wordWrap: "break-word",
  },
  input: {
    justifyContent: "flex-end",
  },
}));

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [chatChannel, setchatChannel] = useState(null);
  const classes = useStyles();
  const bubbleRef = useRef(null);

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

  useEffect(() => {
    bubbleRef.current && bubbleRef.current.scrollIntoView({ block: "end" });
    return () => {};
  }, [messages]);

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
                flexWrap: "wrap",
              }}
            >
              <ChatBubble label={message.body} className={classes.chip} />
              <div ref={bubbleRef} />
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  });
  return (
    <div className={classes.root}>
      <div className={classes.root}>{messageList}</div>
      <MessageForm chatChannel={chatChannel} userId={props.userId} />
    </div>
  );
};

export default Chat;
