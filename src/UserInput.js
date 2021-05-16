import "./App.css";
import { useState } from "react";
const UserInput = (props) => {
  return (
    <form
      onSubmit={(e) => {
        props.handleSubmit(e);
      }}
    >
      <label>
        Answer
        <input type="text" value={props.answer} onChange={props.handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UserInput;
