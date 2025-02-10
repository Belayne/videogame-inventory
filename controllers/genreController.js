import db from "../db/queries.js";

async function showGenre(req, res) {
    const { genre } = req.params;
    const gameList = await db.getAllGamesInGenre(genre);

    res.send(gameList);
}

const genreController = {
    showGenre
}

export default genreController;