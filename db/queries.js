import pool from "./pool.js";

function query(query_strig, parameters, callback) {
    return pool.query(query_strig, parameters);
}

async function getAllGames() {
    const { rows } = await query(`SELECT * FROM videogames;`)
    return rows;
}

async function getAllGameTitles() {
    const { rows } = await query('SELECT title FROM videogames;')
    return rows.map(row => row.title);
}

async function getAllDevelopers() {
    const { rows } = await query(`SELECT * FROM developers;`)
    return rows;
}

async function getAllDevelopersNames() {
    const { rows } = await query('SELECT name FROM developers;')
    return rows.map(row => row.name);
}

async function getAllGenres() {
    const { rows } = await query('SELECT genre FROM genres;');
    return rows.map(row => row.genre);
}

async function getAllGamesInGenre(genre) {
    const { rows } = await query(`
        SELECT title, release_date, name FROM videogames
        JOIN developers ON developers.id = videogames.developer_id
        JOIN videogame_genre ON videogame_id=videogames.id
        WHERE genre_id=(SELECT id FROM genres
            WHERE genre=$1);`,
        [genre]);
    
    return rows;
}

async function getNumberOfGamesInGenre(genre) {
    const { rows } = await query(`
        SELECT COUNT(*) FROM genres
        JOIN videogame_genre ON genres.id = genre_id
        WHERE genre=$1;`,      
        [genre])

    return rows;
}

const db = {
    getAllGames,
    getAllDevelopers,
    getAllDevelopersNames,
    getAllGameTitles,
    getAllGenres,
    getAllGamesInGenre,
    getNumberOfGamesInGenre
}

export default db;