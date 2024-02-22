import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// console.log(process.env.NEXTAUTH_URL);
// if (!process.env.DATABASE_URL) {
//   throw new Error('Missing data base');
// }

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);
