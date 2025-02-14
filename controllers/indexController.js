import db from "../db/queries.js";

async function showIndex(req, res) {
    const games = await db.getAllGames();
    const developers = await db.getAllDevelopers();
    const genres = await db.getAllGenres();
    res.render("index", {title: "Videogame Inventory", games, developers, genres});
}

const indexController = {
    showIndex
}

export default indexController;