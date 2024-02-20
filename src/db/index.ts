import { drizzle } from 'drizzle-orm/postgres-js';

const sql = process.env.DATABASE_URL || '';

export const db = drizzle(sql);
