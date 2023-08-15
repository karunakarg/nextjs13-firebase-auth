import { auth } from "firebase-admin";
import { customInitApp } from "@/config/firebase-admin-config";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Init the Firebase SDK every time the server is called
customInitApp();

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true);

  // Get userdetails from the decodedClaims
  const { uid, email, name, picture } = decodedClaims;
  // console.log(uid, email, name, picture);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({uid:uid, email:email, name:name, picture:picture, isLogged: true }, { status: 200 });
}