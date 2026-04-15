import { Customer } from '@prisma/client';

declare global {
  namespace Express {
    // We are intentionally creating an empty interface here to merge declarations.
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends Customer {}

    export interface Request {
      user?: User;
    }
  }
}