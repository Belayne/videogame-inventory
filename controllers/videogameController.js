import db from "../db/queries.js";

async function showVideogame(req, res) {
    const {videogameID} = req.params;

    const videogameData = await db.getVideogameData(videogameID);
    res.render("videogame", {videogameData});
}

async function showNewVideogameForm(req, res) {
    const developers = await db.getAllDevelopers();
    const genres = await db.getAllGenres();
    res.render("videogameForm", {developers, genres});
}

async function createNewVideogame(req, res) {
    const {title, release_date} = req.body;
    const developer_id = Number(req.body.developer);
    const genre_id = Number(req.body.genre);
    await db.insertNewVideogame({title, developer_id, genre_id, release_date});
    res.redirect("/");
}

const videogameController = {
    showVideogame,
    showNewVideogameForm,
    createNewVideogame
}

export default videogameController;