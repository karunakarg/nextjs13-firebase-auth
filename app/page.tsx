import Link from "next/link";
import {getCurrentUser} from "@/lib/session";
import { UserDetails } from "@/types";
import Logout from "./components/Logout";
import SignIn from "./login/page";

export default async function LandingPage() {
    const currentUser : UserDetails = await getCurrentUser();

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>
            <div className="flex space-x-4">
                <p>{currentUser.email}</p>
                {currentUser.isLoggedIn ? (
                    <>
                        <Link href={"/dashboard"}>Dashboard</Link>
                        <Logout></Logout>
                        {/* <Link href={"/logout"}>Logout</Link> */}
                    </>
                ) : (
                    <SignIn></SignIn>
                )}
                {/* <Link href={"/sign-up"}><Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register</Button></Link> */}
            </div>
        </div>
    );
}

// export default LandingPage;