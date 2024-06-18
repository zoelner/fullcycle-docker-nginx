
import { createServer } from 'node:http';
import pg from 'pg'
const { Pool } = pg

const port = 3000;

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'database',
    database: 'fullcycle',
    password: 'mysecretpassword',
    port: 5432,
});


async function seedUsers() {
    const names = ['Alice', 'Bob', 'Charlie'];

    // Insert the user names into the PostgreSQL table

    const insertPromises = names.map(name => pool.query('INSERT INTO users (name) VALUES ($1)', [name]));

    await Promise.all(insertPromises);
}

// Create an HTTP server
const server = createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        try {
            // Query the PostgreSQL table for user names
            const result = await pool.query('SELECT name FROM users');

            // Extract the user names from the query result
            const userNames = result.rows.map(row => row.name);

            // Send the user names as the response
            res.statusCode = 200;
            res.setHeader('Content-Type', ' text/html; charset=utf-8');

            const html = `<h1>Full Cycle Rocks!</h1>\n

            <ul>\n
            ${userNames.map(name => `<li>${name}</li>`).join('\n')}
            </ul>\n
            `

            res.end(html);
        } catch (error) {
            console.error('Error occurred:', error);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

// Start the server
server.listen(port, () => {
    seedUsers().then(() => {
        console.log('Users seeded');
        console.log(`Server listening on port ${port}`);
    })
});


server.on('close', async () => {
    // Close the PostgreSQL connection pool
    await pool.end();
});