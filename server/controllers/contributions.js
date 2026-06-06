import { pool } from '../config/database.js';

// 1. Get all contributions for a specific service (Read)
export const getContributions = async (req, res) => {
    const service_id = parseInt(req.params.id);
    try {
        const results = await pool.query(
            `SELECT c.*, u.username FROM contributions c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.service_id = $1 ORDER BY u.username ASC`, 
            [service_id]
        );
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// 2. Add a new person to a service (Create)
export const createContribution = async (req, res) => {
    const { user_id, service_id, amount_due } = req.body;
    try {
        const results = await pool.query(
            'INSERT INTO contributions (user_id, service_id, amount_due) VALUES($1, $2, $3) RETURNING *',
            [user_id, service_id, amount_due]
        );
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// 3. Toggle paid status on the same page (Update/Patch) [3]
export const togglePaidStatus = async (req, res) => {
    const id = parseInt(req.params.id);
    const { paid } = req.body;
    try {
        const results = await pool.query(
            'UPDATE contributions SET paid = $1 WHERE id = $2 RETURNING *',
            [paid, id]
        );
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};