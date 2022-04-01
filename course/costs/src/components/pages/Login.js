import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./Login.module.css";
// import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [login, setLogin] = useState({});

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  function submit(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    };
    const url = "http://localhost:3004/users/login";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.form_container}>
      <form onSubmit={submit} className={styles.form}>
        <h1>Login</h1>
        <Input
          type="email"
          text="Email"
          name="email"
          handleOnChange={handleChange}
          placeholder="Email"
        />
        <Input
          type="password"
          text="Senha"
          name="password"
          handleOnChange={handleChange}
        />

        <SubmitButton text="Entrar" />

        {/* <Link to="/cadastrar">Cadastrar</Link> */}
      </form>
    </div>
  );
}

export default Login;
