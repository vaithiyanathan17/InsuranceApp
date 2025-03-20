# InsuranceApp

Web application for an insurance platform where users can:
1. View a list of insurance policies.
2. Search for policies by name.
3. Filter policies based on premium range, policy type, and coverage amount.
4. Optionally, sort the policies by premium (ascending/descending).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
- [Frontend](#frontend)
- [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [Key Files and Directories](#key-files-and-directories)
- [Scripts](#scripts)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vaithiyanathan17/InsuranceApp.git
    cd InsuranceApp
    ```

2. Install the dependencies for both backend and frontend:

    ```bash
    cd BackEnd
    npm install
    cd ../FrontEnd
    npm install
    ```

## Usage

### Backend

1. Build the backend project:

    ```bash
    cd BackEnd
    npm run build
    ```

2. Start the backend server:

    ```bash
    npm start
    ```

3. The backend server will be running at `http://localhost:3000`.

### Frontend

1. Start the frontend development server:

    ```bash
    cd FrontEnd
    npm run dev
    ```

2. The frontend application will be running at `http://localhost:5173`.

## Backend

The backend service is built with Node.js, Express, and SQLite. It provides APIs for managing insurance data.

### API Documentation

The API documentation is available in the `insuranceApi.yaml` file located in the `bundle` directory. The API follows the OpenAPI specification.

#### Endpoints

- `GET /`: Health check endpoint.
- `GET /insurances`: Get a list of insurances.
- `GET /insurances/type`: Get a list of distinct insurance types.

#### Filtering and Sorting

The `/insurances` endpoint supports filtering and sorting capabilities. The following filters and sort orders are available:

##### Filters

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

##### Sort Order

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

## Docker Setup

To run the entire application using Docker, follow these steps:

### Build and start the Docker containers:

```bash
docker-compose up --build
```

1. The backend service will be running at http://localhost:3000

2. The frontend service will be running at http://localhost:5173

## Project Structure

InsuranceApp
├── docker-compose.yml
├── [README.md](http://_vscodecontentref_/1)
├── BackEnd/
│   ├── .dockerignore
│   ├── .gitignore
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── index.ts
│   ├── package.json
│   ├── [README.md](http://_vscodecontentref_/2)
│   ├── tsconfig.json
│   ├── types.ts
│   ├── bundle/
│   │   └── insuranceApi.yaml
│   ├── data/
│   │   ├── database.sqlite
│   │   ├── database.sqlite-shm
│   │   └── database.sqlite-wal
│   ├── database/
│   │   ├── seed-data.sql
│   │   └── sq-lite-connector.ts
│   ├── openApi/
│   │   ├── openApi.yaml
│   │   └── paths/
│   │       ├── defaultGet.yaml
│   │       ├── getInsurances.yaml
│   │       └── getInsurancesType.yaml
│   └── server/
│       ├── insurances.ts
│       ├── link-builder.ts
│       ├── migrate-db.ts
│       ├── paginator.ts
│       ├── query-builder.ts
│       ├── types.ts
│       └── models/
│           └── policy-model.ts
└── FrontEnd/
    ├── .gitignore
    ├── docker-compose.yml
    ├── Dockerfile
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── [README.md](http://_vscodecontentref_/3)
    ├── vite.config.js
    ├── public/
    └── src/
        ├── apiService.js
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── utils.js
        ├── components/
        │   ├── FilterForm.jsx
        │   └── InsurancesTable.jsx
        └── pages/
            └── InsuranceListPage.jsx


## Key Files and Directories

### Backend

- `index.ts`: Entry point of the application.
- `database/`: Contains database connection and seed data.
    - `sq-lite-connector.ts`: SQLite database connection setup.
    - `seed-data.sql`: SQL script to seed the database with initial data.
- `server/`: Contains the server logic, routes, and models.
    - `insurances.ts`: Route handlers for insurance-related endpoints.
    - `migrate-db.ts`: Script to handle database migrations.
    - `paginator.ts`: Utility for paginating results.
    - `query-builder.ts`: Utility for building SQL queries based on filters and sorting.
    - `models/policy-model.ts`: Defines the insurance policy model.
- `openApi/`: Contains OpenAPI specification files.
    - `openApi.yaml`: Main OpenAPI specification file.
    - `paths/`: Contains path-specific OpenAPI definitions.
- `bundle/`: Contains the bundled OpenAPI specification.
    - `insuranceApi.yaml`: Bundled OpenAPI specification file.
- `data/`: Contains the SQLite database files.

### Frontend

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

### Backend

- `npm start`: Start the server.
- `npm run build`: Build the project.
- `npm run start:dev`: Start the server in development mode with hot-reloading.
- `npm run start:docker`: Start the server using Docker.
- `npm run stop:docker`: Stop the Docker containers.
- `npm run build:docs`: Build the OpenAPI documentation.
- `npm run start:docs`: Start the OpenAPI documentation server.

### Frontend

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for linting errors.
- `npm run preview`: Preview the production build.
- `npm run start:docker`: Start the frontend service using Docker.
- `npm run stop:docker`: Stop the Docker containers.

## Contact

For any doubts or assistance, please contact:

- **Vaithiyanathan Veerappan**
- Email: [vaithiayanthan.veerappan@gmail.com](mailto:vaithiayanthan.veerappan@gmail.com)


