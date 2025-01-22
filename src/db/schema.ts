import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import type { AdapterAccountType } from 'next-auth/adapters';
import { sql } from 'drizzle-orm';

export const userRoles = ['user', 'marketing', 'registry', 'admin'] as const;
export type UserRole = (typeof userRoles)[number];

export const users = sqliteTable('users', {
  id: text()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  studentId: integer(),
  role: text({ enum: userRoles }).notNull().default('user'),
  name: text(),
  email: text().unique(),
  emailVerified: integer({ mode: 'timestamp_ms' }),
  image: text(),
});

export const accounts = sqliteTable(
  'accounts',
  {
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text().$type<AdapterAccountType>().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refresh_token: text(),
    access_token: text(),
    expires_at: integer(),
    token_type: text(),
    scope: text(),
    id_token: text(),
    session_state: text(),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = sqliteTable('session', {
  sessionToken: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer({ mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
  'verification_tokens',
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: integer({ mode: 'timestamp_ms' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = sqliteTable(
  'authenticators',
  {
    credentialID: text().notNull().unique(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text().notNull(),
    credentialPublicKey: text().notNull(),
    counter: integer().notNull(),
    credentialDeviceType: text().notNull(),
    credentialBackedUp: integer({
      mode: 'boolean',
    }).notNull(),
    transports: text(),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const nextOfKinRelationships = [
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Spouse',
  'Child',
  'Other',
] as const;

export const maritalStatuses = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Other',
] as const;

export const genders = ['Male', 'Female'] as const;
export const religions = [
  'Christian',
  'Muslim',
  'Hindu',
  'Buddhist',
  'Other',
] as const;

export const students = sqliteTable(
  'students',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    nationalId: text().notNull(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: text().notNull(),
    email: text().notNull().unique(),
    phone1: text().notNull(),
    phone2: text(),
    religion: text({ enum: religions }).notNull(),
    dateOfBirth: integer({ mode: 'timestamp' }).notNull(),
    gender: text({ enum: genders }).notNull(),
    maritalStatus: text({ enum: maritalStatuses }).notNull(),
    birthPlace: text().notNull(),
    homeTown: text().notNull(),
    highSchool: text().notNull(),
    nextOfKinNames: text().notNull(),
    nextOfKinPhone: text().notNull(),
    nextOfKinRelationship: text({ enum: nextOfKinRelationships }).notNull(),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    emailIdx: index('student_email_idx').on(table.email),
    nationalIdIdx: index('student_national_id_idx').on(table.nationalId),
    nameIdx: index('student_name_idx').on(table.name),
  })
);
