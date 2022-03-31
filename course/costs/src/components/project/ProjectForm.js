import { useEffect, useState } from "react";
import styles from "./ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
function ProjectForm({ handleSubmit, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "http://localhost:4000/categories/";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log("Esse err", err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };
  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }
  function handleSelect(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        handleOnChange={handleChange}
        placeholder="Insira o nome do projeto"
        value={project.name ? project.name : ""}
      />
      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        handleOnChange={handleChange}
        placeholder="Insira o Orçamento total"
        value={project.budget ? project.budget : ""}
      />
      <Select
        options={categories}
        name="category_id"
        text="Selecione a categoria"
        handleOnChange={handleSelect}
        value={project.category ? project.category.id : ""}
      />
      <SubmitButton text="Salvar" />
    </form>
  );
}

export default ProjectForm;
