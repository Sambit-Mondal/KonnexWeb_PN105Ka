const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection 
const MONGODB_URI = 'mongodb://localhost:27017/smart_home';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define schema 
const deviceSchema = new mongoose.Schema({
    teamId: { type: String, required: true },
    device: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true }
});


const Device = mongoose.model('Device', deviceSchema);

app.use(bodyParser.json());

// POST endpoint for controlling devices
app.post('/devices', (req, res) => {
    const { id, device, value } = req.body;

   
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid id' });
    }

   
    if (!device || typeof device !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid device' });
    }

   
    Device.create({ teamId: id, device, value })
        .then(() => {
          
            return res.json({ success: true, message: 'Device data saved successfully' });
        })
        .catch(error => {
          
            return res.status(500).json({ success: false, message: 'Failed to save device data', error: error.message });
        });
});

app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});


app.get('/devices/:id', (req, res) => {
    const { id } = req.params;

    // Find devices based on teamId
    Device.find({ teamId: id })
        .then(devices => {
            // If devices are found, return them
            if (devices.length > 0) {
                return res.json({ success: true, data: devices });
            } else {
                // If no devices are found, return a 404 response
                return res.status(404).json({ success: false, message: 'No devices found for the provided team ID' });
            }
        })
        .catch(error => {
            // If an error occurs, return a 500 response
            return res.status(500).json({ success: false, message: 'Failed to retrieve device data', error: error.message });
        });
});