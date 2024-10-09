import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";

const PUBLIC_FILE = /\.(.*)$/;

const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};

// export default NextAuth(authConfig).auth;

export default NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request: { headers, nextUrl } }) => {
      const url = nextUrl.clone();
      const host = headers.get("host");
      const subdomain = getValidSubdomain(host);
      console.log(subdomain);
      
      if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} as NextAuthConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
};
