import React, { useState } from "react";

const MessageForm = (props) => {
  const { chatChannel, userId } = props;
  const [body, setBody] = useState("");
  const handleChange = (event) => {
    setBody(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    chatChannel.speak({
      message: body,
      receiver_id: userId,
    });
    setBody("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={body}
          onChange={handleChange}
          placeholder="Type message here"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default MessageForm;
