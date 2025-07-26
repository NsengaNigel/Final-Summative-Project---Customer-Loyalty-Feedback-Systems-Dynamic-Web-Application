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
- Start the JSON Server on port 3000
- Watch SASS files for changes
- Open the application in your default browser

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