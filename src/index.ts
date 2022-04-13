import * as functions from "firebase-functions";
import admin from 'firebase-admin'
import serviceAccount from './serviceAccount.json'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id
    }),
    databaseURL: 'https://console-codecoast-dev-default-rtdb.firebaseio.com'
  })

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
