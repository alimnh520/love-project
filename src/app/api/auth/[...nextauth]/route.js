import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: "40759986375-6m3jo4pbn5a5e11g6u1cl6mb79ljg6mb.apps.googleusercontent.com",
            clientSecret: "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"
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = credentials;
                // if (!email || !password) {
                //     throw new Error("require all fields");
                // }
                return user;
            }
        })
    ],
    callbacks: {
        async signIn({account, profile}){
            if (account?.provider === 'google') {
                
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.name = user?.username || user.name;
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    name: token.name,
                    email: token.email
                }
            }
            return session
        },
    },
    secret: "sdhfhDFKHFJDHFVEDSfUHfgugdfcusdh345rwffdSHKJhskjd",
    pages: {
        signIn: "/components/login"
    },
});
export { handler as GET, handler as POST }