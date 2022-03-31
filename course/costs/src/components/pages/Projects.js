import { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import { useLocation } from "react-router-dom";
import Container from "../layout/Container";
import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    const url = "http://localhost:4000/projects";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  function removeProject(id) {
    const url = "http://localhost:4000/projects/" + id;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProjects(
          projects.filter((project) => {
            return project.id !== id;
          })
        );
        setProjectMessage("Projeto removido com sucesso");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message msg={message} type="sucess" />}
      {projectMessage && <Message msg={projectMessage} type="sucess" />}

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <ProjectCard
                name={project.name}
                id={project.id}
                budget={project.budget}
                category={project.category.name}
                key={project.id}
                handleRemove={removeProject}
              />
            );
          })}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
