    

// import { auth } from "firebase-admin";
import {auth} from "@/config/firebase-config"
import { customInitApp } from "@/config/firebase-admin-config";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Init the Firebase SDK every time the server is called
customInitApp();

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await auth.signOut();
        cookies().delete("session");

    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({}, { status: 200 });
}