declare global {
    namespace Express {
      interface Request {
        query: {
          filter?: {
            [field: string]: {
              [operator in 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte']?: string | number;
            };
          };
        };
      }
    }
  }