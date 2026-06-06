import express from 'express';
import cors from 'cors';
import serviceRoutes from './routes/services.js';

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON [13]
app.use(cors()); // Enables cross-origin requests [13]

// Routes
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center;">TribePay API 💸</h1>');
});

app.use('/api/services', serviceRoutes); // Services endpoint [15]

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});