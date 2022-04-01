import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./Cadastro.module.css";

function Cadastro() {
  const [register, setRegister] = useState({});
  function handleChange(e) {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  }
  function submit(e) {
    e.preventDefault();
    const { password, email, first_name, last_name, confirm_password } =
      register;
    if (!password || !email || !first_name || !last_name || !confirm_password) {
      alert("Preencha todos os campos");
      return false;
    }
    if (register.password !== register.confirm_password) {
      alert("Senha diferente da confirmação de senha");
      return false;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    };
    const url = "http://localhost:3004/users/register";
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
        <h1>Cadastro</h1>
        <Input
          type="text"
          text="Nome"
          name="first_name"
          handleOnChange={handleChange}
          placeholder="Nome"
        />
        <Input
          type="text"
          text="Sobrenome Nome"
          name="last_name"
          handleOnChange={handleChange}
          placeholder="Sobrenome"
        />
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
        <Input
          type="password"
          text="Confirmar Senha"
          name="confirm_password"
          handleOnChange={handleChange}
        />
        <SubmitButton text="Cadastrar" />
      </form>
    </div>
  );
}

export default Cadastro;
