import * as functions from "firebase-functions";
import admin from 'firebase-admin'
import serviceAccountKey from '../src/serviceAccountKey.json'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: serviceAccountKey.private_key,
    clientEmail: serviceAccountKey.client_email,
    projectId: serviceAccountKey.project_id
  }),
  databaseURL: 'https://console-codecoast-dev-default-rtdb.firebaseio.com'
})

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase! #2");
});
