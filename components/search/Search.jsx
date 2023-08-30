import InputUI from "../ui/inputUI/InputUI";
import ButtonUI from "../ui/buttonUI/ButtonUI";

import style from "./Search.module.scss";

function Search() {
  return (
    <div className={style.content}>
      <div className={style.inputBox}>
        <InputUI
          inputStyle="search"
          inputType="text"
          inputPlaceholder="Destination"
        />
      </div>
      <div className={style.buttonBox}>
        <ButtonUI text="Calculate Route" btnStyle="btn__pill__small" />
      </div>
      <div className={style.del}></div>
      <div className={style.distanceBox}>Distance</div>
      <div className={style.durationBox}>Duration</div>
      <div className={style.userCenter}></div>
    </div>
  );
}

export default Search;
