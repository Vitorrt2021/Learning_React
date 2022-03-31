import PropTypes from "prop-types";

function Item({ nome, idade }) {
  return (
    <>
      <li>
        {nome} : {idade}
      </li>
    </>
  );
}
Item.propTypes = {
  nome: PropTypes.string.isRequired,
  idade: PropTypes.number.isRequired,
};
Item.defaultProps = {
  nome: "Nome",
  idade: 0,
};
export default Item;
