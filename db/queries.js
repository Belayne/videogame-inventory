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

const db = {
    getAllGames,
    getAllDevelopers,
    getAllDevelopersNames,
    getAllGameTitles,
    getAllGenres
}

export default db;