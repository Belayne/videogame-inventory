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

async function getDeveloperData(developer) {
    const { rows } = await query(`
        SELECT * FROM developers
        WHERE name=$1
        `, [developer])

    return rows[0];
}

async function getVideogameData(videogame) {
    const { rows } = await query(`
        SELECT *, name as developer FROM videogames
        JOIN developers ON developers.id=developer_id
        WHERE title=$1
        `, [videogame]);

    return rows[0]
}

async function insertNewDeveloper(name, country, headquarters, website) {
    await query(`INSERT INTO developers (name, country, headquarters, website) VALUES($1, $2, $3, $4)`, [name, country, headquarters, website]);
}

async function insertNewVideogame(title, release_date, developer_id) {
    await query(`INSERT INTO videogames (title, release_date, developer_ID) VALUES($1, $2, $3)` [title, release_date, developer_id]);
}

const db = {
    getAllGames,
    getAllDevelopers,
    getAllDevelopersNames,
    getAllGameTitles,
    getAllGenres,
    getAllGamesInGenre,
    getDeveloperData,
    getVideogameData,
    insertNewDeveloper
}

export default db;