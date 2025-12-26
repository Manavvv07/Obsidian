# Obsidian

**Advanced Productivity Dashboard**

Obsidian is a Chrome Extension designed to replace your "New Tab" page with a React-based productivity dashboard.

## Features

* **New Tab Override:** Replaces the default Chrome new tab page with a custom dashboard.
* **Performance:** Built with Vite for fast load times and HMR.
* **Permissions:** Utilizes Geolocation and Storage for a personalized experience.

## Tech Stack

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [ESLint](https://eslint.org/)

## Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd obsidian
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

To start the local development server:

```bash
npm run dev
```

### Folder Structure
```bash
obsidian/
├── public/
│   ├── manifest.json  # Chrome Extension manifest
│   └── icons/         # Extension icons
├── src/
│   ├── main.jsx       # Entry point
│   ├── App.jsx        # Main component
│   └── index.css      # Global styles
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
└── package.json       # Project dependencies and scripts
```