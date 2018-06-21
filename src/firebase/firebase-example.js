import * as firebase from "firebase"
let config = {
    apiKey: "YourKey",
    authDomain: "Domain",
    databaseURL: "DatabaseUrl",
    projectId: "projectID",
    storageBucket: "storageBucket",
    messagingSenderId: "SenderID"
};
firebase.initializeApp(config);

const firebaseAuth = firebase.auth()
const firebaseDB = firebase.database()

export {
    firebase,
    firebaseAuth,
    firebaseDB
} 