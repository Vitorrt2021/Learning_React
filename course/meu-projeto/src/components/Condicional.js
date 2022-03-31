import { useReducer, useState } from "react";

function Condicional() {
  function mand(e) {
    e.preventDefault();
    alert(email);
  }
  const [email, setEmail] = useState();
  const [userEmail, setUserEmail] = useState();

  return (
    <>
      <h2>Cadastre o seu email</h2>
      <form>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            if (email.length >= 4) {
              setUserEmail(email);
            } else {
              setUserEmail("");
            }
          }}
          placeholder="Email"
        />
        {userEmail && (
          <>
            <input type="submit" onClick={mand} value="mandar" />
            <label>Quer enviar o email?</label>
          </>
        )}
      </form>
    </>
  );
}

export default Condicional;
