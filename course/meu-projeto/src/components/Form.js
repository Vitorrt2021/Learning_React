import { useState } from "react";
import Button from "./Button";

function Form() {
  function mandar(e) {
    e.preventDefault();
    alert(name + " Idade " + idade);
  }
  const [name, setName] = useState();
  const [idade, setIdade] = useState();

  return (
    <form>
      <h2>Formulário</h2>
      <div>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Idade"
          onChange={(e) => {
            setIdade(e.target.value);
          }}
        />
      </div>

      <div>
        <input type="date" />
      </div>
      <Button method={() => alert("click")} value="Alert" />
      <input onClick={mandar} type="submit" value="Mandar" />
    </form>
  );
}

export default Form;
