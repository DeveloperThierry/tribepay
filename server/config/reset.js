import { pool } from './database.js';

const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS contributions;
        DROP TABLE IF EXISTS services;
        DROP TABLE IF EXISTS users;

        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            username varchar(100) NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS services (
            id serial PRIMARY KEY,
            name varchar(100) NOT NULL,
            monthly_cost money NOT NULL,
            owner_id int REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS contributions (
            id serial PRIMARY KEY,
            user_id int REFERENCES users(id) ON DELETE CASCADE,
            service_id int REFERENCES services(id) ON DELETE CASCADE,
            amount_due money NOT NULL,
            paid boolean DEFAULT false
        );
    `;

    try {
        await pool.query(createTablesQuery);
        console.log('🎉 Tables created successfully');
    } catch (err) {
        console.error('⚠ Error creating tables', err);
    }
};

const seedData = async () => {
    await createTables();
    // Simple seed logic
    await pool.query("INSERT INTO users (username) VALUES ('Alice'), ('Bob')");
    await pool.query("INSERT INTO services (name, monthly_cost, owner_id) VALUES ('Netflix', 15.99, 1)");
    await pool.query("INSERT INTO contributions (user_id, service_id, amount_due) VALUES (2, 1, 7.99)");
    console.log('✅ Database seeded');
};

seedData();
