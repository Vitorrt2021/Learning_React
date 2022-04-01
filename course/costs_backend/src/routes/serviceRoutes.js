const {
  insertServiceDB,
  getService,
  getServices,
  deleteService,
} = require("../model/services");
const { isOwnerOfProject } = require("../model/projects");

const { checkToken } = require("../controller/validation");

const router = require("express").Router();

router.get("/all/:projectId", checkToken, async (req, res) => {
  try {
    const project_id = req.params.projectId;
    const user_id = req.userId;
    const services = await getServices(project_id, user_id);
    res.json({ msg: "Success", services });
  } catch {
    (err) => {
      res.json({ mgs: "Erro", err });
    };
  }
});

router.get("/:serviceId", checkToken, async (req, res) => {
  try {
    const service_id = req.params.serviceId;
    const user_id = req.userId;
    console.log(service_id);
    console.log(user_id);
    const services = await getService(service_id, user_id);
    res.json({ msg: "Success", services });
  } catch {
    (err) => {
      res.json({ mgs: "Erro", err });
    };
  }
});

router.post("/:projectId", checkToken, async (req, res) => {
  try {
    const { name, cost, description } = req.body;
    if (!name || !cost || !description) {
      res.json({ msg: "Erro Falta dados" });
      return false;
    }
    const user_id = req.userId;
    const project_id = req.params.projectId;
    const isOwner = await isOwnerOfProject(user_id, project_id);

    if (!isOwner) {
      res.json({ msg: "Não existe esse projeto" });
      return false;
    }

    const idService = await insertServiceDB(
      project_id,
      name,
      cost,
      description
    );
    const service = await getService(idService, user_id);
    res.json({ msg: "Inserido com sucesso", service });
  } catch {
    (e) => {
      console.log(e);
      res.json({ msg: "Falha", e });
    };
  }
});

router.delete("/:serviceID", checkToken, async (req, res) => {
  try {
    const service_id = req.params.serviceID;
    const user_id = req.userId;

    const service = await getService(service_id, user_id);

    if (!service) {
      res.json({ msg: "Falha na deleção" });
      return false;
    }
    const deleteID = await deleteService(service_id);
    console.log(deleteID);
    if (deleteID) {
      res.json({ msg: "Removido com sucesso", service });
      return true;
    }
    res.json({ msg: "Falha na deleção" });
    return false;
  } catch {
    (e) => {
      console.log(e);
      res.json({ msg: "Falha", e });
    };
  }
});
module.exports = router;
