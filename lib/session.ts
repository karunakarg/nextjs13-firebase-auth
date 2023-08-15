import { cookies, headers } from "next/headers";
import { auth as adminAuth } from "firebase-admin";
import { auth } from "@/config/firebase-config";
import { customInitApp } from "../config/firebase-admin-config";

// import { authOptions } from "@/lib/auth"
import { UserDetails } from "../types";

customInitApp();

export async function getCurrentUser() {
  const session = cookies().get("session")?.value || "";
  //Validate if the cookie exist in the request
  const user : UserDetails = {
    isLoggedIn: false,
    email: null,
    uid: null,
    name: null,
    picture: null
  }
  if (session) {
    const decodedClaims = await adminAuth().verifySessionCookie(session, true);
    const { uid, email, name, picture } = decodedClaims;
    if (decodedClaims) {
      user.uid = uid;
      user.isLoggedIn = true;
      user.name = name;
      user.email = email;
      user.picture = picture;
    }
  }
  return user;
}

export async function logout(){
  try {
      await auth.signOut();
      cookies().delete("session");

  } catch (error) {
      console.log(error);
  }
}