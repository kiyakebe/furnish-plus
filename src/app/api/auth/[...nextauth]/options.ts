import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter Your Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        const res = await fetch(`${process.env.BACKEND_URL}/auth/jwt/create/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const user = await res.json();
        if (res.ok && user) {
          // console.log("user", user);
          const user_data = await fetch(
            `${process.env.BACKEND_URL}/auth/users/me/`,
            {
              method: "GET",
              headers: {
                Authorization: `JWT ${user.access}`,
              },
            }
          );

          const user_data_json = await user_data.json();
          // console.log(user_data_json);
          if (user_data_json) {
            return {
              id: user_data_json.id,
              email: user_data_json.email,
              username: user_data_json.username,
              accessToken: user.access,
              refreshToken: user.refresh,
              name: user_data_json.first_name + user_data_json.last_name,
              message: user.message,
              success: user.success,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn() {
      // console.log("credentials looooooooooooooooooooooooooog", credentials);

      return true;
    },
    async jwt({ token, user }) {
      // console.log("first token is ", token, "user in jwt is ", user);
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      // console.log("new token is ", token);
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      // console.log("first session is ", session, "token in session is ", token);
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
