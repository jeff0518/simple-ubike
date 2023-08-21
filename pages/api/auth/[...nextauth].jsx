import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "@/components/lib/auth";
import { connectToDatabase } from "@/components/lib/db";
export const authOptions = {
  secret: "xaqhGJ8rd1aD9Zpg7k6lH4JcD+qvTDyKEJzty2n3MyM=",
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("user");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
