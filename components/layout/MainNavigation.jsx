import Link from "next/link";

import style from "./MainNavigation.module.scss";

function MainNavigation() {
  return (
    <header className={style.header}>
      <div className={style.loge}>
        <Link href="/">Next uBike</Link>
      </div>
      <input
        type="checkbox"
        className={style.toggle}
        id="navbar-toggle"
      ></input>
      <nav>
        <ul>
          <li>
            <Link href="/search">顯示全部</Link>
          </li>
          <li>
            <Link href="/search/one">只顯示1代</Link>
          </li>
          <li>
            <Link href="/search/two">只顯示2代</Link>
          </li>
          <li>
            <Link href="/auth">登出</Link>
          </li>
        </ul>
      </nav>
      <label className={style.toggle__label} htmlFor="navbar-toggle">
        <span className={style.hamburger} />
      </label>
    </header>
  );
}

export default MainNavigation;
