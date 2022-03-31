import Frase from "./Frase";
import Img from "./Img";
import List from "./List";
import ButtonAlert from "./ButtonAlert";
import Form from "./Form";
import Condicional from "./Condicional";

function Main() {
  const name = "Vitor";
  const url = "https://via.placeholder.com/150";
  const frase = `O nome do autor é ${name}`;
  return (
    <main>
      <h1>Alterando o JSX</h1>
      <Frase frase={frase} />
      <Img src={url} alt="Imagem" />
      <List />
      <ButtonAlert />
      <Form />
      <Condicional />
    </main>
  );
}

export default Main;
