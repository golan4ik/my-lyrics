import React from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
} from "@material-ui/core";

const AuthFormControl = ({ id, label, type, value, onChange, error, ...rest}) => {
  return (
    <FormControl margin="normal">
      <TextField
        id={id}
        label={label}
        aria-describedby={label}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

AuthFormControl.defaultProps = {
  value: "",
  type: "text",
  onChange: () => {
    console.log("no callback defined");
  },
};

export default AuthFormControl;
