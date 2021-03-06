import styles from "./Home.module.css";
import savings from "../../img/savings.svg";

import LinkButton from "../layout/LinkButton";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <spam>Costs</spam>
      </h1>
      <p>Comece a gerenciar os seus projetos</p>
      <LinkButton to="/newproject" text="Criar Projeto" />
      <img src={savings} alt="costs"></img>
    </section>
  );
}

export default Home;
