import express, { urlencoded } from "express";
import path from "path";
import indexRouter from "./routes/indexRouter.js";

const PORT = process.env.PORT || 8000;
const __dirname = import.meta.dirname;
const assetsPath = path.join(__dirname, "public");
const app = express();

app.use(express.static(assetsPath));

app.use(urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(indexRouter);

app.listen(PORT, () => console.log("Server listening on port " + PORT));
