// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); // Import path module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(session({
    secret: 'G7!tR3@qW9#zX1', // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 60 * 1000 } // 10 hours
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_db_user',
    password: 'your_db_password',
    database: 'admin_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(401).send('Invalid credentials');

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send('Server error');
            if (!isMatch) return res.status(401).send('Invalid credentials');

            req.session.userId = user.id;
            res.send('Login successful');
        });
    });
});

// Create User
app.post('/create-user', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) return res.status(500).send('Server error');
        res.send('User  created successfully');
    });
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Server error');
        res.send('Logged out successfully');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});