# InsuranceApp Backend

This is the backend service for the InsuranceApp, built with Node.js, Express, and SQLite. It provides APIs for managing insurance data.

## NOTE: PLEASE MAKE SURE YOU HAVE NODE VERSION 18.16.0

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [Key Files and Directories](#key-files-and-directories)
- [Scripts](#scripts)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vaithiyanathan17/InsuranceApp.git
    cd InsuranceApp/BackEnd
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DATABASE_URL=sqlite://path_to_your_database
    ```

## Usage

1. Build the project:

    ```bash
    npm run build
    ```

2. Start the server:

    ```bash
    npm start
    ```

3. The server will be running at `http://localhost:3000`.

## API Documentation

The API documentation is available in the `insuranceApi.yaml` file located in the `bundle` directory. The API follows the OpenAPI specification.

### Endpoints

- `GET /`: Health check endpoint.
- `GET /insurances`: Get a list of insurances.
- `GET /insurances/type`: Get a list of distinct insurance types.

### Filtering and Sorting

The `/insurances` endpoint supports filtering and sorting capabilities. The following filters and sort orders are available:

#### Filters

- `name`: Filter by insurance name.
  - `eq`: Equal to
  - `ne`: Not equal to
- `premium`: Filter by premium amount.
  - `eq`: Equal to
  - `ne`: Not equal to
  - `gt`: Greater than
  - `gte`: Greater than or equal to
  - `lt`: Less than
  - `lte`: Less than or equal to
- `policyType`: Filter by policy type.
  - `eq`: Equal to
  - `ne`: Not equal to
- `coverage`: Filter by coverage amount.
  - `eq`: Equal to
  - `ne`: Not equal to
  - `gt`: Greater than
  - `gte`: Greater than or equal to
  - `lt`: Less than
  - `lte`: Less than or equal to

#### Sort Order

- `order`: Sort the results by a specific field.
  - `name`: Sort by name (ascending)
  - `-name`: Sort by name (descending)
  - `premium`: Sort by premium (ascending)
  - `-premium`: Sort by premium (descending)
  - `type`: Sort by type (ascending)
  - `-type`: Sort by type (descending)
  - `coverage`: Sort by coverage (ascending)
  - `-coverage`: Sort by coverage (descending)

### Example Request

```http
GET /insurances?filter[name][eq]=Secure Future Term Life&filter[premium][gte]=3000&order=-premium
```

## Project Structure

InsuranceApp/BackEnd
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.ts
├── package.json
├── tsconfig.json
├── types.ts
├── bundle/
│   └── insuranceApi.yaml
├── data/
│   ├── database.sqlite
│   ├── database.sqlite-shm
│   └── database.sqlite-wal
├── database/
│   ├── seed-data.sql
│   └── sq-lite-connector.ts
├── openApi/
│   ├── openApi.yaml
│   └── paths/
│       ├── defaultGet.yaml
│       ├── getInsurances.yaml
│       └── getInsurancesType.yaml
└── server/
    ├── insurances.ts
    ├── link-builder.ts
    ├── migrate-db.ts
    ├── paginator.ts
    ├── query-builder.ts
    ├── types.ts
    └── models/
        └── policy-model.ts




GitHub Copilot
Sure, here's a comprehensive README.md file that includes the project structure, key files and directories, and scripts for the backend of your InsuranceApp project:

Environment Variables
DATABASE_URL: The URL for the SQLite database.
Docker Setup
To run the backend service using Docker, follow these steps:

Build and start the Docker containers:

The backend service will be running at http://localhost:3000.

Project Structure
Key Files and Directories
index.ts: Entry point of the application.
database/: Contains database connection and seed data.
sq-lite-connector.ts: SQLite database connection setup.
seed-data.sql: SQL script to seed the database with initial data.
server/: Contains the server logic, routes, and models.
insurances.ts: Route handlers for insurance-related endpoints.
migrate-db.ts: Script to handle database migrations.
paginator.ts: Utility for paginating results.
query-builder.ts: Utility for building SQL queries based on filters and sorting.
models/policy-model.ts: Defines the insurance policy model.
openApi/: Contains OpenAPI specification files.
openApi.yaml: Main OpenAPI specification file.
paths/: Contains path-specific OpenAPI definitions.
bundle/: Contains the bundled OpenAPI specification.
insuranceApi.yaml: Bundled OpenAPI specification file.
data/: Contains the SQLite database files.
Scripts
npm start: Start the server.
npm run build: Build the project.
npm run start:dev: Start the server in development mode with hot-reloading.
npm run start:docker: Start the server using Docker.
npm run stop:docker: Stop the Docker containers.
npm run build:docs: Build the OpenAPI documentation.
npm run start:docs: Start the OpenAPI documentation server.