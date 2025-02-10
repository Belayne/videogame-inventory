import db from "../db/queries.js";

async function showIndex(req, res) {
    const titles = await db.getAllGameTitles();
    const developers = await db.getAllDevelopersNames();
    const genres = await db.getAllGenres();
    res.render("index", {title: "Videogame Inventory", games: titles, developers, genres});
}

const indexController = {
    showIndex
}

export default indexController;