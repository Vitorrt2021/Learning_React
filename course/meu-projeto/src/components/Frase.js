import styles from "./Frase.module.css";

function Frase(props) {
  return <p className={styles.fraseContent}>{props.frase}</p>;
}

export default Frase;
