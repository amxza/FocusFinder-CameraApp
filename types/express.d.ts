import { Customer } from '@prisma/client';

// Extend the Express Request object with a 'user' property
declare global {
  namespace Express {
    // These declarations are merged into the official Express types
    export interface User extends Customer {}

    export interface Request {
      user?: User;
    }
  }
}