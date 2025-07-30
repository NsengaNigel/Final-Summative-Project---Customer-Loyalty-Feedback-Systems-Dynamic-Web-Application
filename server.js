const express = require('express');
const path = require('path');
const app = express();
const net = require('net');

// Serve static files
app.use(express.static(__dirname));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to check if a port is available
function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(port, () => {
            server.close();
            resolve(true);
        });
        server.on('error', () => {
            resolve(false);
        });
    });
}

// Function to find an available port
async function findAvailablePort(startPort) {
    let port = startPort;
    while (port < 65536) {
        if (await isPortAvailable(port)) {
            return port;
        }
        port++;
    }
    throw new Error('No available ports found');
}

// Start the server
async function startServer() {
    try {
        const preferredPort = parseInt(process.env.PORT) || 3000;
        const port = await findAvailablePort(preferredPort);
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Open your browser and navigate to http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer(); 