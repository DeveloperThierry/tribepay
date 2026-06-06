import express from 'express';
import cors from 'cors';
import serviceRoutes from './routes/services.js';
import contribRoutes from './routes/contributions.js';
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON [13]
app.use(cors({
    origin: '*', // For development, allow everything. Or specify your 5173 cloud workstation URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Routes
  app.get('/', (req, res) => {
      res.status(200).send('<h1 style="text-align: center;">TribePay API 💸</h1>');
    });
    
    app.use('/api/services', serviceRoutes);
    app.use('/api/contributions', contribRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});