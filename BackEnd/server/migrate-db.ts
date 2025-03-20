import SQLiteConnector from "../database/sq-lite-connector.js";
import fs from "fs";
import path from 'path';

const seedDatabase = async (db: any) => {
    try {
        console.log("###Running Seed Data");
        console.log(process.cwd());
        const seedFilePath = path.join(process.cwd(), "database", "seed-data.sql");
        const seedSQL = fs.readFileSync(seedFilePath, "utf-8");
        await db.exec(seedSQL);
        console.log("Seed Data Inserted Successfully.");
    } catch (error: any) {
        console.error(`Error running seed data: ${error.message}`);
    }
};

(async function postDeploy() {
    console.info("## Starting DB migrations Job");
    try {
        const db = await SQLiteConnector.getInstance();
        console.log(db);
        console.log("###Running database migrations...");
        await db.exec(`
            CREATE TABLE IF NOT EXISTS policies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                premium INTEGER NOT NULL,
                coverage INTEGER NOT NULL
            );
        `);
        console.log("Policies table created.");
        
        //seed database

        await seedDatabase(db);

        console.info("## Closing DB connection");
    } catch (error: any) {
        console.error(`Migrations Job failed! ${error.message}`);
        console.error(error.stack);
    } finally {
        console.info("## Finished migrations");
    }
})();
