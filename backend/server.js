const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@faturamecluster.0vbmrv8.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=FaturameCluster`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const albumRoutes = require('./routes/album');
const musicRoutes = require('./routes/musics');
const genreRoutes = require('./routes/genres');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/musics', musicRoutes);
app.use('/api/genres', genreRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
