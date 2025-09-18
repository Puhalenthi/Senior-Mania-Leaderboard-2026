import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'sm_admin';

export interface AdminSession { user: string; iat: number; }

export function signSession(user: string) {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
  return jwt.sign({ user }, secret, { expiresIn: '12h' });
}

export function verifySession(token: string): AdminSession | null {
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
    return jwt.verify(token, secret) as AdminSession;
  } catch {
    return null;
  }
}

export function getSessionServer(): AdminSession | null {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if(!token) return null;
  return verifySession(token);
}

export function isAdmin() {
  return !!getSessionServer();
}

export const cookieName = COOKIE_NAME;
