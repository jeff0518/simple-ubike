import MainNavigation from "./MainNavigation";

import style from "./Layout.module.scss";

function Layout(props) {
  return (
    <div className={style.content}>
      <MainNavigation />
      {props.children}
    </div>
  );
}

export default Layout;
