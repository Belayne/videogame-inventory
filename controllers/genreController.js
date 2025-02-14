import db from "../db/queries.js";

async function showGenre(req, res, next) {
    const { genreID, genre } = req.params;
    const gameList = await db.getAllGamesInGenre(genreID);
    res.render("genre", {title: genre, games: gameList, numberOfGames: gameList.length});
}

async function createNewGenre(req, res) {
    const { genre } = req.body;
    await db.insertNewGenre(genre);
    res.redirect("/");
}

async function showNewGenreForm(req, res) {
    res.render("genreForm");
}

const genreController = {
    showGenre,
    showNewGenreForm,
    createNewGenre
}

export default genreController;