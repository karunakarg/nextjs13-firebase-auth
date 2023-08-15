// import React from 'react';
// import {auth} from "@/config/firebase-config";
import { redirect } from "next/navigation";
import {logout} from "@/lib/session";

export default function Logout() {
    // const router = useRouter();
        console.log("in logout");
        logout();
        redirect("/");
          // router.push("/");
    // return (
    //   <></>
    // )
}