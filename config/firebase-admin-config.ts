import { initializeApp, getApps, cert } from 'firebase-admin/app';

// const firebaseAdminConfig = {
//     credential: cert(process.env.FIREBASE_SECRET_KEY)
// }

const firebaseAdminConfig = {
    credential: cert({
        projectId: "fir-next13-823d8",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
      })
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}