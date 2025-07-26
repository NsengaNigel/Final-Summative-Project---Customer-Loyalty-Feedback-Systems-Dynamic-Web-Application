const express = require('express');
const path = require('path');
const app = express();
const findAvailablePort = require('find-port-sync');

// Serve static files
app.use(express.static(__dirname));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Find available port
const preferredPort = process.env.PORT || 3000;
const PORT = findAvailablePort(preferredPort, preferredPort + 10);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open your browser and navigate to http://localhost:${PORT}`);
}); 