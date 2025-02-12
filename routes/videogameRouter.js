import { Router } from "express";
import videogameController from "../controllers/videogameController.js";

const videogameRouter = Router();

videogameRouter.get("/:videogameTitle", videogameController.showVideogame);

export default videogameRouter;