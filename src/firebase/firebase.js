import * as firebase from "firebase"
let config = {
    apiKey: "AIzaSyDOkFDd1vU6pnDsa_KvX6Oh4NBaz69rYzk",
    authDomain: "smartkiln-a9934.firebaseapp.com",
    databaseURL: "https://smartkiln-a9934.firebaseio.com",
    projectId: "smartkiln-a9934",
    storageBucket: "smartkiln-a9934.appspot.com",
    messagingSenderId: "76905323499"
};
firebase.initializeApp(config);

const auth = firebase.auth()
const db = firebase.database()

export {
    firebase,
    auth,
    db
} 