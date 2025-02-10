import indexController from "../controllers/indexController.js";
import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", indexController.showIndex);

export default indexRouter;