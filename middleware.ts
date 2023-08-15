import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {getCurrentUser} from "@/lib/session";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const apiEndpoint = new URL("/api/user", `http://${request.headers.host}`);

  //Call the authentication endpoint
  const responseAPI = await fetch("http://localhost:3000/api/user", {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ["/dashboard/:path*"],
};