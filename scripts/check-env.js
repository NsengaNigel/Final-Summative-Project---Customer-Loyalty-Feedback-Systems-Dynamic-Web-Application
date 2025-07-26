const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkNodeVersion() {
    const requiredNode = '14.0.0';
    const currentNode = process.version;
    if (currentNode.replace('v', '') < requiredNode) {
        console.error(`Error: Node.js version ${requiredNode} or higher is required. Current version: ${currentNode}`);
        process.exit(1);
    }
}

function checkNpmVersion() {
    try {
        const npmVersion = execSync('npm --version').toString().trim();
        const requiredNpm = '6.0.0';
        if (npmVersion < requiredNpm) {
            console.error(`Error: npm version ${requiredNpm} or higher is required. Current version: ${npmVersion}`);
            process.exit(1);
        }
    } catch (error) {
        console.error('Error: Unable to determine npm version');
        process.exit(1);
    }
}

function checkRequiredFiles() {
    const requiredFiles = [
        'package.json',
        'server.js',
        'data/db.json',
        'assets/scss/main.scss',
        'pages/login.html',
        'pages/register.html',
        'pages/dashboard.html'
    ];

    for (const file of requiredFiles) {
        if (!fs.existsSync(path.join(process.cwd(), file))) {
            console.error(`Error: Required file '${file}' is missing`);
            process.exit(1);
        }
    }
}

function checkPorts() {
    const ports = [3000, 3001];
    for (const port of ports) {
        try {
            execSync(`lsof -i :${port}`);
            console.warn(`Warning: Port ${port} is already in use. The application will try to use an alternative port.`);
        } catch (error) {
            // Port is available
        }
    }
}

function main() {
    console.log('Checking environment requirements...');
    checkNodeVersion();
    checkNpmVersion();
    checkRequiredFiles();
    checkPorts();
    console.log('Environment check completed successfully!');
}

main(); 