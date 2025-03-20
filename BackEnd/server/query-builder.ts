import { SQLOperator } from "./types.js";

export class SQLiteQueryBuilder {
    static buildWhereClause(
        filters: Record<string, any>
      ): { where: string, params: any[] } {
        const conditions: string[] = [];
        const params: any[] = [];
      
        for (const [key, value] of Object.entries(filters)) {
          if (!value) continue;

          const column = this.camelToLowerCase(key);
          const fullKey = column;
      
          if (typeof value === 'object' && !Array.isArray(value)) {
            const ops = value as SQLOperator;

            const validOperators = Object.entries(ops).filter(([op]) => 
              ['eq', 'ne', 'lt', 'lte', 'gt', 'gte'].includes(op)
            );
      
            if (validOperators.length === 0) continue;
      
            validOperators.forEach(([op, val]) => {
                if(fullKey === 'name') {
                    conditions.push(`${fullKey} LIKE ?`)
                    params.push(`%${val}%`);
                } else {
                    conditions.push(`${fullKey} ${this.getOperatorSymbol(op)} ?`);
                    params.push(val);
                }
            });
          } else {
            conditions.push(`${fullKey} = ?`);
            params.push(value);
          }
        }
      
        return {
          where: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
          params
        };
    }

    private static getOperatorSymbol(op: string): string {
        const operators = {
            eq: '=',
            ne: '!=',
            lt: '<',
            lte: '<=',
            gt: '>',
            gte: '>='
        }
        return operators[op];
    }
  private static camelToLowerCase(str: string): string {
    return str.toLowerCase();
  }
}
