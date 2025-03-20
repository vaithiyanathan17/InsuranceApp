import express from "express";
import { router as InsuracesRoute } from "./server/insurances.js";
import dotenv from "dotenv";
import SQLiteConnector  from "./database/sq-lite-connector.js";
import * as OpenApiValidator from 'express-openapi-validator';
import path from "path";
import "./server/migrate-db.js";
import qs from 'qs';

const app = express();
const __dirname = path.resolve();
const apiBundlePath = path.join(__dirname, 'bundle', 'insuranceApi.yaml');

dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
    try{
        SQLiteConnector.getInstance();
        console.log('connnection established');
        next();
    }
    catch(error) {
        console.log(error);
        res.send(500).send('DB connection error');
    }
});

app.set('query parser', (str: string) => {
  return qs.parse(str, {
    allowDots: true,
    depth: 10,
    parameterLimit: 1000
  });
});

app.use(OpenApiValidator.middleware({
    apiSpec: apiBundlePath,
    validateRequests: true,
    validateResponses: true,
    coerceTypes: false,
    validateApiSpec: true,
    validateFormats: "full"
}));


app.get("/", (req, res, next) => {
  res.status(200);
  res.send("<H1>Up and running</H1>");
});

app.use("/", InsuracesRoute);


app.use((err: { status?: number; message: string; }, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({
      message: err.message
    });
  });

const server = app.listen(3000, () => console.log("app running at 3000"));


const shutdown = async () => {
  console.log('\nStarting shutdown...');
  
  try {
    await new Promise((resolve, reject) => {
      server.close((err) => err ? reject(err) : resolve(true));
    });
    console.log('HTTP server closed');

    // Then close database connections
    SQLiteConnector.closeConnection();
    console.log('Database connections closed');

    // Exit process
    process.exit(0);
  } catch (err) {
    console.error('Shutdown error:', err);
    process.exit(1);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
