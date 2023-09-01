import React from "react";

import style from "./InputUI.module.scss";

const InputUI = React.forwardRef((props, ref) => {
  const {
    inputId,
    inputType,
    inputText,
    inputStyle,
    inputRef,
    inputPlaceholder,
    value,
    onChange,
  } = props;
  return (
    <div className={style[inputStyle]}>
      <label htmlFor={inputId}>{inputText}</label>
      <input
        type={inputType}
        id={inputId}
        ref={inputRef}
        placeholder={inputPlaceholder}
        onChange={onChange}
        value={value}
        required
      ></input>
    </div>
  );
});

export default InputUI;
