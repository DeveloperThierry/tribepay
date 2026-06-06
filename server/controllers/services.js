import { pool } from '../config/database.js';

export const getServices = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM services ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const createService = async (req, res) => {
    const { name, monthly_cost, owner_id } = req.body;
    try {
        const results = await pool.query(
            'INSERT INTO services (name, monthly_cost, owner_id) VALUES($1, $2, $3) RETURNING *',
            [name, monthly_cost, owner_id]
        );
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const updateService = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, monthly_cost } = req.body;
    try {
        const results = await pool.query(
            'UPDATE services SET name = $1, monthly_cost = $2 WHERE id = $3 RETURNING *',
            [name, monthly_cost, id]
        );
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const deleteService = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM services WHERE id = $1', [id]);
        res.status(200).json({ message: "Service deleted" });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};