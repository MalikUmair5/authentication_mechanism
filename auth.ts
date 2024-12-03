import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { hashPassword, verifyPassword } from "./lib/utils/hashPassword";
import { getUserFromDb } from "./lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        let password = credentials.password as string;
        // logic to verify if the user exists
        let email = credentials.email as string;

        user = await getUserFromDb({ email });

        let passwordVarified = await verifyPassword(
          password,
          user.data[0].Password
        );

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        } else if (passwordVarified) {
            // User exists and password is correct
            return user.data[0];
        }
        // return user object with their profile data
        return user;
      },
    }),
  ],
});
