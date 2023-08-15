"use client"

import React from 'react'
import {auth} from "@/config/firebase-config";
import { redirect, useRouter } from "next/navigation";
// import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();
    const handleLogout = async () => {
        console.log("in logout");
        try {
            await auth.signOut();
            await fetch("/api/logout", {
                method: "POST"
              }).then((response) => {
                if (response.status === 200) {
                    router.push("/login");
                }
              });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout;