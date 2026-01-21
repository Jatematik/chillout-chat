import { NextRequest, NextResponse } from "next/server";
import admin from "./lib/firebase.admin";

const protectedRoutes = ["/", "/chat", /^\/chat\/.+$/];
const publicRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (typeof route === "string") {
      return path === route;
    } else if (route instanceof RegExp) {
      return route.test(path);
    }
    return false;
  });
  const isPublicRoute = publicRoutes.includes(path);

  const token = req.cookies.get("session")?.value;
  let user = null;

  if (token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      user = decodedToken;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && user && !req.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|sw\\.js).*)"],
};
