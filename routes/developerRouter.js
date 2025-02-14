import { Router } from "express";
import developerController from "../controllers/developerController.js";

const developerRouter = Router();

developerRouter.get("/:developerID/:developer", developerController.showDeveloper);
developerRouter.get("/new", developerController.showNewDeveloperForm);
developerRouter.post("/new", developerController.createDeveloper);

export default developerRouter;