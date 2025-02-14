import db from "../db/queries.js";

async function showVideogame(req, res) {
    const {videogameID} = req.params;

    const videogameData = await db.getVideogameData(videogameID);
    res.render("videogame", {videogameData});
}

const videogameController = {
    showVideogame
}

export default videogameController;