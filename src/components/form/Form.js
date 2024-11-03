import React from "react";
import TextField from "@mui/material/TextField";

export default function Form({ setUserInput }) {
  function onChangeHandler(event) {
    setUserInput(event.target.value);
  }

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        helperText="Enter a artwork title"
        onChange={onChangeHandler}
      />
    </div>
  );
}
