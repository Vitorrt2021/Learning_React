import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import Container from "../layout/Container";
import styles from "./NewProject.module.css";

function NewProject() {
  const history = useNavigate();

  function createPost(project) {
    // Initialize cost and services
    project.cost = 0;
    project.services = [];

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    };
    const url = "http://localhost:4000/projects/";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //Redirect
        history("/projects", {
          state: { message: "Projeto criado com sucesso" },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container customClass="center">
      <div className={styles.newproject_container}>
        <h1>Criar Projeto</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm handleSubmit={createPost} />
      </div>
    </Container>
  );
}

export default NewProject;
