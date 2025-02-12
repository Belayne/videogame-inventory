import db from "../db/queries.js";

async function showVideogame(req, res) {
    const {videogameTitle} = req.params;

    const videogameData = await db.getVideogameData(videogameTitle);
    res.render("videogame", {videogameData});
}

const videogameController = {
    showVideogame
}

export default videogameController;