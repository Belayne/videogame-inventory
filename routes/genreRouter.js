import genreController from "../controllers/genreController.js";
import { Router } from "express";

const genreRouter = Router();

genreRouter.get("/:genre", genreController.showGenre);

export default genreRouter;