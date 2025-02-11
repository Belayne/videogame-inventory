import { Router } from "express";
import developerController from "../controllers/developerController.js";

const developerRouter = Router();

developerRouter.get("/:developer", developerController.showDeveloper);

export default developerRouter;