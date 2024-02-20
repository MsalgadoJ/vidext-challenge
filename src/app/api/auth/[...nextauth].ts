import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '../../../db';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error('Missing google oauth credentials');
}

export default NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      GITHUB_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
