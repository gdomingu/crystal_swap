import React, { useState, useEffect, useRef } from "react";
import MessageForm from "./MessageForm";
import { UserContext } from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import ChatBubble from "../components/ChatBubble";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
  },
  chip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    wordWrap: "break-word",
  },
  cardHeader: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
  },
  messageList: {
    overflowY: "scroll",
    flex: "1",
  },
}));

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const classes = useStyles();
  const bubbleRef = useRef(null);
  const { tradeReq } = props;

  useEffect(() => {
    if (CableApp.room) CableApp.cable.subscriptions.remove(CableApp.room);
    CableApp.room = CableApp.cable.subscriptions.create(
      { channel: "ChatChannel", room: tradeReq.id },
      {
        received: function (data) {
          if (data.type == "message") {
            setMessages((prevMessages) => [...prevMessages, ...data.messages]);
          } else {
            setMessages(data.messages);
          }
        },
        speak: function (data) {
          data["trade_request_id"] = tradeReq.id;
          return this.perform("speak", data);
        },
        connected: function () {
          return this.perform("load", {
            trade_request_id: tradeReq.id,
          });
        },
      }
    );
    return () => {};
  }, [tradeReq.id]);

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
    <div className={classes.chatContainer}>
      <div className={classes.cardHeader}>
        <Typography variant="subtitle1">{tradeReq.requested_by}</Typography>
      </div>
      <div className={classes.messageList}>{messageList}</div>
      <MessageForm userId={tradeReq.gift.gift_from.id} />
    </div>
  );
};

export default Chat;
