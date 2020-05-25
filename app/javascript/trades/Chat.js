import React, { useState, useEffect, useRef } from "react";
import MessageForm from "./MessageForm";
import { UserContext } from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import ChatBubble from "../components/ChatBubble";

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
  const { tradeReq, handleBackClick } = props;
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

  const chattingWith = (user) => {
    if (user.email == tradeReq.requested_by.email) {
      return tradeReq.gift.gift_from;
    }
    return tradeReq.requested_by;
  };
  const messageList = (user) =>
    messages.map((message) => {
      return (
        <div
          style={{
            justifyContent: flexDir(user, message),
            display: "flex",
            flexWrap: "wrap",
          }}
          key={message.id}
        >
          <ChatBubble label={message.body} className={classes.chip} />
          <div ref={bubbleRef} />
        </div>
      );
    });
  return (
    <UserContext.Consumer>
      {(user) => {
        return (
          <div className={classes.chatContainer}>
            <div className={classes.cardHeader}>
              {handleBackClick && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleBackClick}
                  size="small"
                >
                  <ChevronLeftIcon />
                </IconButton>
              )}
              <Typography variant="subtitle1" component="span">
                {chattingWith(user).email}
              </Typography>
            </div>
            <div className={classes.messageList}>{messageList(user)}</div>
            <MessageForm userId={chattingWith(user).id} />
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Chat;
