import genreController from "../controllers/genreController.js";
import { Router } from "express";

const genreRouter = Router();

genreRouter.get("/:genre", genreController.showGenre);
genreRouter.get("/new", genreController.showNewGenreForm);
genreRouter.post("/new", genreController.createNewGenre);

export default genreRouter;