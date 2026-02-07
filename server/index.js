const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Contact form endpoint placeholder
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received contact form:', { name, email, message });
    res.json({ success: true, message: 'Message received and logged.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
