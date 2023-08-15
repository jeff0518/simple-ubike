import Link from "next/link";

import style from "./MainNavigation.module.scss";

function MainNavigation() {
  return (
    <header className={style.header}>
      <Link href="/">
        <div className={style.loge}>uBike</div>
      </Link>
      <nav>
        <ul>
          <Link href="/search">
            <li>顯示全部</li>
          </Link>

          <Link href="/search/one">
            <li>只顯示1代</li>
          </Link>

          <Link href="/search/two">
            <li>只顯示2代</li>
          </Link>

          <Link href="/auth">
            <li>登出</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
