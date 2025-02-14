import { Router } from "express";
import videogameController from "../controllers/videogameController.js";

const videogameRouter = Router();

videogameRouter.get("/:videogameID/:videogameTitle", videogameController.showVideogame);

export default videogameRouter;