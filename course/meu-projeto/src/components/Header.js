import { useState } from "react";
import SeuNome from "./SeuNome";
import Nav from "./Nav";

function Header() {
  const [nome, setNome] = useState();
  return (
    <header>
      <h1>Header Component {nome}</h1>
      <SeuNome set={setNome} />
      <Nav />
    </header>
  );
}

export default Header;
