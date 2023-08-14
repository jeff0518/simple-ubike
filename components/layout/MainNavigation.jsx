import Link from "next/link";

import style from "./MainNavigation.module.scss";

function MainNavigation() {
  return (
    <header className={style.header}>
      <Link href="/">
        <div className={style.loge}>Search UBike</div>
      </Link>
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
    </header>
  );
}

export default MainNavigation;
