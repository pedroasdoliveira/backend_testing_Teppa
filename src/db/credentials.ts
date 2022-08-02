import * as admin from "firebase-admin";
import * as credentials from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(credentials as admin.ServiceAccount),
});

export const db = admin.firestore();