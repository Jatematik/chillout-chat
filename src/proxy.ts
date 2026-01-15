import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/", "/chat", /^\/chat\/.+$/];
const publicRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  // const isProtectedRoute = protectedRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (typeof route === "string") {
      return path === route;
    } else if (route instanceof RegExp) {
      return route.test(path);
    }
    return false;
  });
  const isPublicRoute = publicRoutes.includes(path);

  console.log(protectedRoutes.includes(path), path);

  // 3. Decrypt the session from the cookie
  const user = true;
  //   const cookie = (await cookies()).get('session')?.value
  //   const session = await decrypt(cookie)

  // 4. Redirect to /login if the user is not authenticated
  if (
    isProtectedRoute &&
    !user
    // !session?.userId
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    user &&
    // session?.userId &&
    !req.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
