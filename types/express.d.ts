import { Customer } from '@prisma/client';

declare global {
  namespace Express {
    // Use a type alias instead of an empty interface
    export type User = Customer;

    export interface Request {
      user?: User;
    }
  }
}