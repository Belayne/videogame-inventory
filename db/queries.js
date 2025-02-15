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
    const { rows } = await query('SELECT * FROM genres;');
    return rows;
}

async function getAllGamesInGenre(genreID) {
    const { rows } = await query(`
        SELECT title, release_date, name FROM videogames
        JOIN developers ON developers.id = videogames.developer_id
        JOIN videogame_genre ON videogame_id=videogames.id
        WHERE genre_id=$1;`,
        [genreID]);
    
    return rows;
}

async function getDeveloperData(developerID) {
    const { rows } = await query(`
        SELECT * FROM developers
        WHERE id=$1;
        `, [developerID])

    return rows[0];
}

async function getVideogameData(videogameID) {
    const { rows } = await query(`
        SELECT *, name as developer FROM videogames
        JOIN developers ON developer_id = developers.id
        WHERE videogames.id=$1;
        `, [videogameID]);

    const videogameData = rows[0];
    videogameData.genres = await getVideogameGenres(videogameID);

    return videogameData;
}

async function getVideogameGenres(videogameID) {
    const {rows} = await query(`
        SELECT string_agg(genre, ', ') as genres FROM genres
        JOIN videogame_genre ON genre_id=genres.id
        WHERE videogame_id=$1;
        `, [videogameID])

    return rows[0].genres;
}

async function insertNewDeveloper(name, country, headquarters, website) {
    await query(`INSERT INTO developers (name, country, headquarters, website) VALUES($1, $2, $3, $4);`, [name, country, headquarters, website]);
}

async function insertNewVideogame({title, release_date, genre_id, developer_id}) {
    const {rows} = await query(`INSERT INTO videogames (title, release_date, developer_id) VALUES($1, $2, $3) RETURNING id as videogame_id;`, [title, release_date, developer_id]);
    const {videogame_id} = rows[0];
    await query(`INSERT INTO videogame_genre(videogame_id, genre_id) VALUES($1, $2);`, [videogame_id, genre_id]);
}

async function insertNewGenre(genre) {
    await query(`INSERT INTO genres (genre) VALUES($1);`, [genre]);
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
    insertNewDeveloper,
    insertNewGenre,
    insertNewVideogame
}

export default db;