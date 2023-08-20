import styles from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props,ref) => {
  return (
    <div className={`${styles.input_div}${props.className}`}>
      <label>{props.label}</label>
      <input ref={ref} {...props.properties} />
    </div>
  );
});
export default Input;
