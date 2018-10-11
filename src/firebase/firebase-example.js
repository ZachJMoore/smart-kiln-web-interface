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

const auth = firebase.auth()
const db = firebase.database()

export {
    firebase,
    auth,
    db
} 