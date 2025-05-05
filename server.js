import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Input from './models/Input.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Add a route to handle input and save it to the database
app.post('/api/inputs', async (req, res) => {
    try {
        const { name, value } = req.body;
        const newInput = new Input({ name, value });
        await newInput.save();
        res.status(201).json({ message: 'Input saved successfully', data: newInput });
    } catch (error) {
        res.status(500).json({ message: 'Error saving input', error });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});