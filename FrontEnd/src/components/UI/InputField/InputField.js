import React from "react";
import style from "./InputField.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const InputField = (props) => {
  return (
    <InputGroup
      onChange={(e) => props.valueUpdate(e.target.value, props)}
      className="mb-3">
      {props.label ? (
        <InputGroup.Prepend>
          <InputGroup.Text className={style.inputLabel}>
            {props.label} :
          </InputGroup.Text>
        </InputGroup.Prepend>
      ) : (
        ""
      )}
      <FormControl
        placeholder={props.placeholder ? props.placeholder : ""}
        type={props.type ? props.type : ""}
        defaultValue={props.defaultValue ? props.defaultValue : props.value}
        id={props.label}
        aria-describedby="basic-addon3"
      />
    </InputGroup>
  );
};

export default InputField;
