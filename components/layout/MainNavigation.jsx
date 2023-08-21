import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import ButtonUI from "../ui/buttonUI/ButtonUI";

import style from "./MainNavigation.module.scss";

function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log(session);
  console.log(loading);

  function logoutHandler() {
    signOut();
  }

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
          {session && (
            <li>
              <Link href="/search">顯示全部</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/search/one">只顯示1代</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/search/two">只顯示2代</Link>
            </li>
          )}
          {!session && !loading && (
            <li>
              <ButtonUI
                text="登出"
                btnStyle="btn__link"
                onClick={logoutHandler}
              ></ButtonUI>
              {/* <Link href="/auth">登出</Link> */}
            </li>
          )}
        </ul>
      </nav>
      <label className={style.toggle__label} htmlFor="navbar-toggle">
        <span className={style.hamburger} />
      </label>
    </header>
  );
}

export default MainNavigation;
