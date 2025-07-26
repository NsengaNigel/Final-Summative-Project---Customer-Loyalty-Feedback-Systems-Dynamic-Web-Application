# EcoConnect - Customer Loyalty & Feedback System

A modern web application for managing customer loyalty programs and feedback for eco-friendly initiatives.

## Features

- User Authentication System
- Customer Feedback Management
- Loyalty Points System
- Event Management
- Profile Management
- Help & Support Center

## Tech Stack

- HTML5
- SASS/CSS3
- Bootstrap 5
- JavaScript/jQuery
- JSON Server (Mock API)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ecoconnect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

This will:
- Start the JSON Server on port 3001 (or next available port)
- Watch SASS files for changes
- Start the web server on port 3000 (or next available port)

## Troubleshooting Guide

### Common Issues and Solutions

1. **Port Already in Use**
   - Error: "EADDRINUSE: address already in use"
   - Solution: The application will automatically try alternative ports
   - Check terminal output for the actual port numbers being used

2. **Node.js Version Issues**
   - Error: "Node.js version 14.0.0 or higher is required"
   - Solution: Update Node.js from https://nodejs.org/
   - Check version: `node --version`

3. **npm Version Issues**
   - Error: "npm version 6.0.0 or higher is required"
   - Solution: Update npm: `npm install -g npm@latest`
   - Check version: `npm --version`

4. **Missing Dependencies**
   - Error: "Cannot find module 'xyz'"
   - Solution: Run `npm install` again
   - If error persists, delete node_modules folder and package-lock.json, then run `npm install`

5. **SASS Compilation Issues**
   - Error: "Cannot find sass module"
   - Solution: Run `npm install sass --save-dev`
   - If error persists, try: `npm rebuild node-sass`

6. **File Permission Issues**
   - Error: "EACCES: permission denied"
   - Solution: Run with proper permissions:
     ```bash
     sudo chown -R $USER:$GROUP .
     npm install
     ```

7. **Database Issues**
   - Error: "Cannot find data/db.json"
   - Solution: Ensure the data folder exists and db.json is present
   - If missing, copy from a teammate or create new:
     ```bash
     mkdir -p data
     cp example.db.json data/db.json
     ```

### Still Having Issues?

1. Clean Installation:
```bash
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
```

2. Check System Requirements:
```bash
npm run postinstall
```

3. Verify File Structure:
```
project-root/
├── index.html
├── pages/
├── assets/
│   ├── scss/
│   ├── css/
│   ├── js/
│   └── images/
├── data/
└── package.json
```

4. Network Issues:
- Ensure ports 3000 and 3001 are available
- Check firewall settings
- Try running on different ports:
  ```bash
  PORT=4000 npm start
  ```

5. Development Tools:
- Use Chrome DevTools (F12) to check for console errors
- Check Network tab for API call issues
- Verify all files are being served correctly

For any other issues, please:
1. Check the error message carefully
2. Look for error logs in the terminal
3. Contact the team lead with:
   - Error message
   - Steps to reproduce
   - Your environment details (OS, Node version, npm version)

## Project Structure

```
project-root/
├── index.html                 # Main landing page
├── pages/                     # HTML pages
├── assets/
│   ├── scss/                 # SASS files
│   ├── css/                  # Compiled CSS
│   ├── js/                   # JavaScript files
│   └── images/               # Image assets
├── data/                     # Mock API data
└── package.json              # Project configuration
```

## Development

### Available Scripts

- `npm start`: Start development server and SASS compiler
- `npm run server`: Start JSON Server only
- `npm run sass`: Start SASS compiler only
- `npm run build`: Build production CSS

### API Endpoints

- `/users` - User management
- `/feedback` - Feedback submissions
- `/events` - Event management
- `/rewards` - Loyalty rewards

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Design inspiration from modern eco-friendly applications
- Built with sustainability in mind 