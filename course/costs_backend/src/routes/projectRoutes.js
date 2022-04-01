const {
  insertProjectDB,
  getProject,
  getProjects,
  deleteProject,
} = require("../model/projects");
const { checkToken } = require("../controller/validation");
const { route } = require("./serviceRoutes");

const router = require("express").Router();

router.get("/", checkToken, async (req, res) => {
  try {
    const user_id = req.userId;
    const projects = await getProjects(user_id);
    res.json({ msg: "Success", projects });
  } catch {
    (err) => {
      res.json({ mgs: "Erro", err });
    };
  }
});
router.get("/:id", checkToken, async (req, res) => {
  try {
    const user_id = req.userId;
    const project_id = req.params.id;
    const project = await getProject(project_id, user_id);
    res.json({ msg: "Success", project });
  } catch {
    (err) => {
      console.log(e);
      res.json({ msg: "Falha", e });
    };
  }
});
router.post("/", checkToken, async (req, res) => {
  try {
    const { name, budget, category_id } = req.body;
    if (!name || !budget || !category_id) {
      res.json({ msg: "Erro Falta dados" });
      return false;
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
  } catch {
    (e) => {
      console.log(e);
      res.json({ msg: "Falha", e });
    };
  }
});

router.delete("/:projectId", checkToken, async (req, res) => {
  try {
    const project_id = req.params.projectId;
    const user_id = req.userId;

    const project = await getProject(project_id, user_id);

    if (!project) {
      res.json({ msg: "Falha na deleção" });
      return false;
    }

    const deleteID = await deleteProject(project_id);

    if (deleteID) {
      res.json({ msg: "Removido com sucesso", project });
      return true;
    }

    res.json({ msg: "Falha na deleção" });
    return false;
  } catch {
    (e) => {
      console.log(e);
      res.json({ msg: "Falha na deleção" });
    };
  }
});
module.exports = router;
