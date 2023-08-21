import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import InputUI from "../ui/inputUI/InputUI";
import ButtonUI from "../ui/buttonUI/ButtonUI";

import style from "./AuthForm.module.scss";

async function createUser(email, password) {
  console.log("it is createUser");
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  function authHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enterEmail = emailInputRef.current.value;
    const enterPassword = passwordInputRef.current.value;
    console.log("this is auth form");
    if (isLogin) {
      // const result = await signIn("credentials", {
      //   redirect: false,
      //   email: enterEmail,
      //   password: enterPassword,
      // });
      // if (!result) {
      //   router.replace("/");
      // }
    } else {
      try {
        const result = await createUser(enterEmail, enterPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
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

          <div className={style.div__btn}>
            {isLogin ? (
              <ButtonUI btnStyle="btn__pill" text="Login" />
            ) : (
              <ButtonUI btnStyle="btn__pill" text="Create Account" />
            )}

            {isLogin ? (
              <ButtonUI
                btnStyle="btn__link"
                text="Create new account"
                onClick={authHandler}
              />
            ) : (
              <ButtonUI
                btnStyle="btn__link"
                text="Login with existing account"
                onClick={authHandler}
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
}

export default AuthForm;
