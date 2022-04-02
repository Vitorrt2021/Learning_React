const router = require("express").Router();

const {
  insertProjectDB,
  getProject,
  getProjects,
  deleteProject,
} = require("../model/projects");

const { checkToken } = require("../controller/validation");
const errorHandler = require("../controller/errorHandler");

router.get("/", checkToken, async (req, res) => {
  const user_id = req.userId;
  const projects = await getProjects(user_id);
  res.json({ msg: "Success", projects });
});

router.get("/:id", checkToken, async (req, res) => {
  try {
    const user_id = req.userId;
    const project_id = req.params.id;
    const project = await getProject(project_id, user_id);
    if (!project) {
      throw new errorHandler.NotFound("Projeto não encontrado");
    }
    res.json({ msg: "Success", project });
  } catch (e) {
    throw new Error(e);
  }
});

router.post("/", checkToken, async (req, res) => {
  try {
    const { name, budget, category_id } = req.body;
    if (!name || !budget || !category_id) {
      throw new errorHandler.BadRequest("Falta dados");
    }

    const user_id = req.userId;
    const idProject = await insertProjectDB(
      user_id,
      category_id,
      name,
      parseFloat(budget)
    );
    const project = await getProject(idProject);
    res.json({ msg: "Inserido com sucesso", project });
  } catch (e) {
    throw Error(e);
  }
});

router.delete("/:projectId", checkToken, async (req, res) => {
  const project_id = req.params.projectId;
  const user_id = req.userId;

  const project = await getProject(project_id, user_id);

  if (!project) {
    throw new errorHandler.NotFound("Projeto não encontrado");
  }

  const deleteID = await deleteProject(project_id);

  if (deleteID) {
    res.json({ msg: "Removido com sucesso", project });
    return true;
  }

  throw new errorHandler.InternalServerError("InternalServerError");
});
module.exports = router;
