import Item from "./Item";

function List() {
  const pessoas = [
    { nome: "Vitor", idade: 12 },
    { nome: "Joana", idade: 82 },
    { nome: "João", idade: 13 },
    { nome: "Maria", idade: 32 },
  ];
  return (
    <>
      <h2>Lista</h2>
      <ul>
        {pessoas.length > 0 ? (
          pessoas.map((pes, index) => {
            return <Item nome={pes.nome} key={index} idade={pes.idade} />;
          })
        ) : (
          <p>Lista Vazia</p>
        )}
        <Item nome="Vitor" idade={18} />
        <Item nome="Lucas" idade={28} />
        <Item nome="João" idade={85} />
        <Item nome="Matheus" idade={42} />

        <Item />
      </ul>
    </>
  );
}

export default List;
