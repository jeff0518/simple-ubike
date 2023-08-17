import React from "react";

import style from "./InputUI.module.scss";

const InputUI = React.forwardRef((props, ref) => {
  const { inputId, inputType, inputText, inputStyle, inputRef } = props;
  return (
    <div className={style[inputStyle]}>
      <label htmlFor={inputId}>{inputText}</label>
      <input type={inputType} id={inputId} ref={ref} required></input>
    </div>
  );
});

export default InputUI;
