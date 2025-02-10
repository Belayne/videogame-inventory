import pg from "pg";
const { Pool } = pg;

const databaseURL = process.env.databaseURL;

export default new Pool({
    connectionString: databaseURL
});

