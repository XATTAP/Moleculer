import pg, { QueryConfig } from 'pg'

const pool = new pg.Pool({
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DATABASE || "test"
});

export async function queryToPostgres(query: QueryConfig) {
    try {
        const result = await pool.query(query);
        return result.rows[0]
    } catch (err) {
        console.error(err);
    } 
};
