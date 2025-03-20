import path, { dirname } from "path";
import dotenv from "dotenv";
import Database, { Database as DatabaseType } from 'better-sqlite3';
import { fileURLToPath } from "url";

dotenv.config();

class SQLiteConnector {
    private static instance: DatabaseType | null = null;

    public static getInstance(): DatabaseType {
        try {
            if (!SQLiteConnector.instance || !SQLiteConnector.instance.open) {
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = dirname(__filename);
                const profile = process.env.APP_PROFILE || 'local';
                const dbPath = profile === 'docker' 
                    ? process.env.DATABASE_URL || '/app/data/database.sqlite'
                    : path.join(__dirname, '../../data/database.sqlite');
                console.log(`Opening database connection to: ${dbPath}`);
                
                SQLiteConnector.instance = new Database(dbPath, {
                    verbose: console.log,
                    fileMustExist: false
                });
                
                SQLiteConnector.instance.pragma("journal_mode = WAL");
            }
            return SQLiteConnector.instance;
        } catch (error) {
            console.error("Database connection failed:", error);
            process.exit(1);
        }
    }

    public static closeConnection() {
        if (SQLiteConnector.instance?.open) {
            SQLiteConnector.instance.close();
            SQLiteConnector.instance = null;
            console.log("Database connection closed");
        }
    }
}

export default SQLiteConnector;
