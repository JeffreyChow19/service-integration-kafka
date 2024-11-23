import express from 'express';

import availabilityRouter from '@routes/availability';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/availability', availabilityRouter);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Hasan Sadikin Hospital API');
});

export default app;
