const { connectToMongoDB, getDB } = require('./database');
const interactionRoutes = require('./routes/interactionRoutes');
const paintingRoutes = require('./routes/paintingRoutes');
const userRoutes = require('./routes/userRoutes');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

// Middleware
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/paintings', paintingRoutes);
app.use('/api/interactions', interactionRoutes);

// Build frontend
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Function to start the server, connect to MongoDB, and upload paintings collection
async function startServer() {
    try {
        const filePath = path.join(__dirname, 'paintings.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const paintings = JSON.parse(fileContents);

        await connectToMongoDB();

        const db = getDB();
        const collection = db.collection('paintings');

        const existingCount = await collection.countDocuments();
        if (existingCount > 0) {
            console.log('Paintings already exist in the collection. Skipping upload.');
        } else {
            await collection.insertMany(paintings);
            console.log('Paintings data inserted into the collection.');
        }

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();