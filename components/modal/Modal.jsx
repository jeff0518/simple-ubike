import ButtonUI from "../ui/buttonUI/ButtonUI";
import style from "./Modal.module.scss";

function Modal(props) {
  const { sna, sbi, bemp, infoTime } = props.data;
  return (
    <>
      <div className={style.backdrop} onClick={props.onClose}></div>
      <div className={style.modal__container}>
        <h2 className={style.modal__title}>{sna}</h2>
        <div className={style.modal__bike}>可借車輛：{sbi}</div>
        <div className={style.modal__vacant}>可停空位：{bemp}</div>
        <div className={style.Modal__time}>時間：{infoTime}</div>
        <ButtonUI text="Calculate Route" btnStyle="btn__pill__small" />
      </div>
    </>
  );
}

export default Modal;
