import { pool } from '../config/database.js';

export const getServices = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM services ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export const getService = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Get a single service by ID
export const getServiceById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Get all contributions for a specific service
export const getContributions = async (req, res) => {
    const service_id = parseInt(req.params.id);
    try {
        const results = await pool.query(
            `SELECT c.*, u.username FROM contributions c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.service_id = $1`, [service_id]
        );
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