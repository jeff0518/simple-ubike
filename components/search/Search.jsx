import InputUI from "../ui/inputUI/InputUI";

import style from "./Search.module.scss";

function Search() {
  return (
    <div className={style.content}>
      <InputUI inputStyle="control" />
    </div>
  );
}

export default Search;
