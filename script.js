// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle changes in fan speed
app.post('/api/fanspeed', (req, res) => {
    const { speed } = req.body;

    // In a real implementation, use the provided API or library to control fan speed
    // Here, we are simulating the response with a simple console log
    alert(Setting fan speed to ${speed});

    // Simulate a successful response
    res.status(200).json({ message: "Fan speed set successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});