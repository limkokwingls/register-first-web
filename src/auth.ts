import { db } from '@/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import Google from 'next-auth/providers/google';
import { accounts, sessions, users, verificationTokens } from '@/db/schema';

const tables: any = {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
  verificationTokensTable: verificationTokens,
};

const database: any = db;
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(database, tables) as Adapter,
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;
      session.user.studentId = user.studentId;
      return session;
    },
  },
});
