import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(new LocalStrategy({
    usernameField: 'email' // Since you're using email to login
  },
  async (email, password, done) => {
    try {
      const user = await prisma.customer.findUnique({ where: { email } });
      
      if (!user) return done(null, false, { message: 'Incorrect email.' });
      
      // In Sprint 2, you'll use bcrypt.compare() here
      if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// How to store the user in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// How to retrieve the user from the session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.customer.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
