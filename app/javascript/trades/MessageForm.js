import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  input: {
    borderRadius: 75,
  },
}));
const MessageForm = (props) => {
  const { userId } = props;
  const [body, setBody] = useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setBody(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    CableApp.room.speak({
      message: body,
      receiver_id: userId,
    });
    setBody("");
  };
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <OutlinedInput
          variant="outlined"
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.input}
          placeholder={"Message"}
        />
      </form>
    </div>
  );
};

export default MessageForm;
