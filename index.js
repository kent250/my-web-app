const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, World!',
        status: 'success',
    });
});

app.get('/about', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('About Page\n');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});