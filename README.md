This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Step1: Install packages
```bash
npm install
```

This will install key packages that are required for firebase auth, like:
`firebase firebase-admin` and `axios`

Step 2: Create new project on Firebase.

Step 3: Add a web app to firebase project.
Click on the settings wheel icon besides "Project Overview", and then go to "project settings > General". At the bottom, there's a section "Your Apps". Select the option to create a web app. That will eventually give you something like this:

```
const firebaseConfig = {
    apiKey: "<apiKey>",
    authDomain: "<authDomain>",
    projectId: "<projectId>",
    storageBucket: "<storageBucket>",
    messagingSenderId: "<messagingSenderId>",
    appId: "<appId>",
    measurementId: "<measurementId>"
  };
```

We will use this to setup our `config/firebase-config.ts` file later.


Step 4: Get private key from Firebase. This allows us to access firebase from our server side logic using the firebase admin sdk.

Go to project overview > project settings > service accounts  > Firebase Admin SDK > (Click on "Generate new private key")

Firebase will give you .json file with you credentials

Step 5: Go to config folder in this project, and update the firebase-admin-config.ts file with the relevant values from the json file you got from earlier step. Similarly, update the firebase-config.ts file using the the config obtained in step 3. For secrets, fill in the relevant env variables in your .env.local file. You can use .env.example file as reference or rename it to .env.local

Step 6: Now, if you start the dev server using `npm run dev`, then you'll be able to use the login functionality.

A few details to make things clear:

- middleware.ts : It intercepts any request the server gets, and then checks the headers for session token, validates it using firebase and redirects accordingly. It has `config` variable which lets you configure which paths to protect using the middleware.
- firebase-config.ts : it exports auth and provider. Provider is currently Google provider, but it could be any other provider as well.

Explanation of existing routes:

- login: this is where login/signup starts. It is a client side page. When you click on "sign in" button, it will redirect to the provider that we passed into it. this is where we can pass other providers as well. Once authenticated, the provider will redirect back with the user credentials `userCred`. We extract the auth token from it, and call the POST api/login endpoint to set the cookie.
- api/login : it exposes POST and GET methods. POST will extract the token from headers, verify it using firebase admin sdk and set the cookie.
- api/user : given a token, it returns details of the currently logged in user.
- lib/session.ts : A server side utility to get details of the current logged in user. Functionally same as api/user
- 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
