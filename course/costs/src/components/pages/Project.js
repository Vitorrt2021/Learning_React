import { parse, v4 as uuidv4 } from "uuid";
import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    const url = "http://localhost:4000/projects/" + id;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProject(data);
        setServices(data.services);
      })
      .catch((err) => console.log(err));
  }, []);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }
  function editPost(project) {
    setMessage(" ");
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo de projeto");
      setType("error");
      return 0;
    }
    const url = "http://localhost:4000/projects/" + id;
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMessage("Projeto atualizado");
        setType("success");

        setProject(data);
        setShowProjectForm(false);
      })
      .catch((err) => console.log(err));
  }
  function createService(project) {
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    const url = "http://localhost:4000/projects/" + project.id;
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMessage("Serviço inserido com sucesso");
        setType("success");

        setProject(data);
        setShowProjectForm(false);
      })
      .catch((err) => console.log(err));
  }
  function removeService(id, cost) {
    const servicesUpdate = project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = project;

    projectUpdated.services = servicesUpdate;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    const url = "http://localhost:4000/projects/" + projectUpdated.id;
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMessage("Removido com sucesso");
        setType("success");

        setServices(servicesUpdate);
        setProject(projectUpdated);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && (
              <>
                <Message type={type} msg={message} />
              </>
            )}

            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>

              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span>
                    {project.category.name}
                  </p>

                  <p>
                    <span>Total de Orçamento:</span>
                    {project.budget}
                  </p>

                  <p>
                    <span>Total Utilizado:</span>
                    {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm handleSubmit={editPost} projectData={project} />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Criar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços:</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => {
                  return (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}
                    />
                  );
                })}
              {services.length === 0 && <p>Não há servi</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Project;
