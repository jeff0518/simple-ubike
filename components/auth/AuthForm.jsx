import { useState, useRef } from "react";
import InputUI from "../ui/inputUI/InputUI";
import ButtonUI from "../ui/buttonUI/ButtonUI";

import style from "./AuthForm.module.scss";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function authHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function submitHandler(event) {
    event.preventDefault();
    const enterEmail = emailInputRef.current.value;
    const enterPassword = passwordInputRef.current.value;
  }

  return (
    <>
      <section className={style.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <InputUI
            inputId="email"
            inputType="email"
            inputStyle="control"
            inputText="Your Email"
            ref={emailInputRef}
          />
          <InputUI
            inputId="password"
            inputType="password"
            inputStyle="control"
            inputText="Your Password"
            ref={passwordInputRef}
          />
        </form>
        <div className={style.div__btn}>
          {isLogin ? (
            <ButtonUI btnStyle="btn__pill" text="Login" />
          ) : (
            <ButtonUI btnStyle="btn__pill" text="Create Account" />
          )}

          {isLogin ? (
            <ButtonUI
              btnStyle="btn__pill"
              text="Create new account"
              onClick={authHandler}
            />
          ) : (
            <ButtonUI
              btnStyle="btn__pill"
              text="Login with existing account"
              onClick={authHandler}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default AuthForm;
