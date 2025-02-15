import { Router } from "express";
import videogameController from "../controllers/videogameController.js";

const videogameRouter = Router();

videogameRouter.get("/:videogameID/:videogameTitle", videogameController.showVideogame);
videogameRouter.get("/new", videogameController.showNewVideogameForm);
videogameRouter.post("/new", videogameController.createNewVideogame);

export default videogameRouter;