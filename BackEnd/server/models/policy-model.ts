import SQLiteConnector from "../../database/sq-lite-connector.js";
import { Database } from "better-sqlite3";
import { policy, QueryParams, Result } from "../types.js";
import { SQLiteQueryBuilder } from "../query-builder.js";
import { buildPagination } from "../paginator.js";


// all the database specific operation goes here
export default class PolicyModel {
  static getCount() {
    const db = SQLiteConnector.getInstance();

    try {
      if (!db.open) {
        throw new Error("Database connection is closed");
      }
      return db.prepare("SELECT count(*) FROM policies").run();
    } catch (error) {
      console.error("Query failed:", error);
      throw error;
    }
  }
  static getAllPolicies(queries: QueryParams): Result<policy> {
    const db = SQLiteConnector.getInstance();

    try {
      if (!db.open) {
        throw new Error("Database connection is closed");
      }

      const { page, limit: pageSize, order: sortBy } = queries;
      const filters = queries.filter || {};
      const { limit, offset, order } = buildPagination({
        page,
        limit: pageSize,
        sort: sortBy?.startsWith("-")
          ? [[sortBy?.slice(1), "DESC"]]
          : [[sortBy, "ASC"]],
      });
      if (Object.keys(queries.filter).length) {
        const flattenedQueryObject: Record<
          string,
          Record<string, string | number>
        > = {};

        const filterKeys: (keyof typeof filters)[] = [
          "name",
          "premium",
          "policyType",
          "coverage",
        ];

        filterKeys.forEach((key) => {
          if (!filters[key]) return;

          const allowedConditions = [
            "eq",
            "ne",
            "gt",
            "gte",
            "lt",
            "lte",
          ] as const;

          allowedConditions.forEach((condition) => {
            if (filters[key]?.[condition] !== undefined) {
              flattenedQueryObject[key] = {
                ...flattenedQueryObject[key],
                [condition]: filters[key][condition],
              };
            }
          });
        });

        const { where, params } =
          SQLiteQueryBuilder.buildWhereClause(flattenedQueryObject);
        const query = `SELECT * FROM policies ${where} ORDER BY ${order} LIMIT ? OFFSET ?`;
        const countQuery = `SELECT count(*) as totalcount FROM policies ${where}`;
        const count = db.prepare(countQuery).get(...params) as Record<string, string>;
        return {
          data: db.prepare(query).all(...params, limit, offset) as unknown as policy[],
          totalCount: Number(count?.totalcount || 0) as number,
        };
      }
      const count = db.prepare("SELECT count(*) as totalcount FROM policies").get() as Record<string, string>;
      return {
        data: db
          .prepare(`SELECT * FROM policies ORDER BY ${order} LIMIT ? OFFSET ?`)
          .all(limit, offset) as unknown as policy[],
        totalCount: Number(count?.totalcount || 0) as number
      };
    } catch (error) {
      throw error;
    }
  }

  static getPolicyType() {
    const db = SQLiteConnector.getInstance();
    const types = db.prepare(`SELECT DISTINCT(type) FROM policies`).all() as { type: string }[];
    return types.map(row => row.type);
  }

  static insertPolicy(
    name: string,
    type: string,
    premium: number,
    coverage: number
  ) {
    const db: Database = SQLiteConnector.getInstance();
    const stmt = db.prepare(
      "INSERT INTO policies (name, type, premium, coverage) VALUES (?, ?, ?, ?)"
    );
    return stmt.run(name, type, premium, coverage);
  }
}
