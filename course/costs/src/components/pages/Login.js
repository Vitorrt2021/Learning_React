import styles from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [login, setLogin] = useState({});

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  function submit(e) {
    e.preventDefault();

    const { email, password } = login;
    if (!email || !password) {
      alert("Necessário preencher todos os inputs");
      return false;
    }

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

        <div className={styles.input_container}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            text="Email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className={styles.input_container}>
          <label htmlFor="password">Senha</label>

          <input
            id="password"
            type="password"
            text="Senha"
            name="password"
            onChange={handleChange}
          />
        </div>

        <button className={styles.btn}>Login</button>
        <Link to="/register">Cadastrar</Link>
      </form>
    </div>
  );
}

export default Login;
