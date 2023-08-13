import style from "./ButtonUI.module.css";

function ButtonUI(props) {
  const { text, btnStyle } = props;
  return (
    <>
      <button className={style[btnStyle]}>{text}</button>
    </>
  );
}

export default ButtonUI;
