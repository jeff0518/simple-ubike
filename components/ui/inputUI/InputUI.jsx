import style from "./InputUI.module.css";

function InputUI(props) {
  const { inputId, inputType, inputText, inputStyle } = props;
  return (
    <div className={style[inputStyle]}>
      <label htmlFor={inputId}>{inputText}</label>
      <input type={inputType} id={inputId} required></input>
    </div>
  );
}

export default InputUI;
