import { Pool } from "pg";

// Prevent multiple connection pools from being created in Next.js development hot-reloading.
const globalForPool = globalThis as unknown as {
  dbPool: Pool | undefined;
};

export function getDbPool(): Pool {
  if (globalForPool.dbPool) {
    return globalForPool.dbPool;
  }

  let connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Missing DATABASE_URL environment variable");
  }

  // Strip sslmode from connection string so it doesn't override the rejectUnauthorized options in pg
  if (connectionString.includes("sslmode=")) {
    connectionString = connectionString.replace(/[?&]sslmode=[^&]*/g, "");
    if (connectionString.endsWith("?") || connectionString.endsWith("&")) {
      connectionString = connectionString.slice(0, -1);
    }
  }

  const poolInstance = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 10, // Maintain a conservative connection limit for serverless execution
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  globalForPool.dbPool = poolInstance;
  return poolInstance;
}

