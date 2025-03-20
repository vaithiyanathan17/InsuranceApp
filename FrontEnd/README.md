# InsuranceApp Frontend

This is the frontend service for the InsuranceApp, built with React and Vite. It provides a user interface for managing insurance data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [Key Files and Directories](#key-files-and-directories)
- [Scripts](#scripts)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vaithiyanathan17/InsuranceApp.git
    cd InsuranceApp/FrontEnd
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. The application will be running at `http://localhost:5173`.

## Docker Setup

To run the frontend service using Docker, follow these steps:

1. Build and start the Docker containers:

    ```bash
    docker-compose up --build
    ```

2. The frontend service will be running at `http://localhost:5173`.

## Project Structure

## Key Files and Directories

- `src/`: Contains the source code for the frontend application.
  - `apiService.js`: Contains functions for making API calls to the backend.
  - `App.jsx`: Main application component.
  - `index.css`: Global CSS styles.
  - `main.jsx`: Entry point of the application.
  - `utils.js`: Utility functions.
  - `components/`: Contains reusable components.
    - `FilterForm.jsx`: Component for filtering insurance policies.
    - `InsurancesTable.jsx`: Component for displaying insurance policies in a table.
  - `pages/`: Contains page components.
    - `InsuranceListPage.jsx`: Page component for displaying the list of insurance policies.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for linting errors.
- `npm run preview`: Preview the production build.
- `npm run start:docker`: Start the frontend service using Docker.
- `npm run stop:docker`: Stop the Docker containers.

## License

This project is licensed under the MIT License.
