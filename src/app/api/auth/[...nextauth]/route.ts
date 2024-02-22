import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing google oauth credentials');
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
