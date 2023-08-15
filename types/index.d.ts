export type UserDetails = {
    name: string | null;
    picture: string | null | undefined;
    email: string | null | undefined;
    uid: string | null;
    isLoggedIn: boolean | false;
}