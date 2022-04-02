const {
  insertServiceDB,
  getService,
  getServices,
  deleteService,
} = require("../model/services");
const { isOwnerOfProject } = require("../model/projects");
const { checkToken } = require("../controller/validation");
const errorHandler = require("../controller/errorHandler");

const router = require("express").Router();

router.get("/all/:projectId", checkToken, async (req, res) => {
  const project_id = req.params.projectId;
  const user_id = req.userId;
  const services = await getServices(project_id, user_id);
  res.json({ msg: "Success", services });
});

router.get("/:serviceId", checkToken, async (req, res) => {
  const service_id = req.params.serviceId;
  const user_id = req.userId;
  const services = await getService(service_id, user_id);
  if (!services) {
    throw new errorHandler.NotFound("Não existe esse serviço");
  }
  res.json({ msg: "Success", services });
});

router.post("/:projectId", checkToken, async (req, res) => {
  const { name, cost, description } = req.body;
  if (!name || !cost || !description) {
    throw new errorHandler.BadRequest("Falta dados");
  }
  const user_id = req.userId;
  const project_id = req.params.projectId;
  const isOwner = await isOwnerOfProject(user_id, project_id);

  if (!isOwner) {
    throw new errorHandler.NotFound("Não existe esse serviço");
  }

  const idService = await insertServiceDB(project_id, name, cost, description);
  const service = await getService(idService, user_id);
  res.json({ msg: "Inserido com sucesso", service });
});

router.delete("/:serviceID", checkToken, async (req, res) => {
  const service_id = req.params.serviceID;
  const user_id = req.userId;

  const service = await getService(service_id, user_id);

  if (!service) {
    throw new errorHandler.NotFound("Não existe esse serviço");
  }
  const deleteID = await deleteService(service_id);

  if (deleteID) {
    res.json({ msg: "Removido com sucesso", service });
    return true;
  }
  throw new errorHandler.InternalServerError("InternalServerError");
});
module.exports = router;
