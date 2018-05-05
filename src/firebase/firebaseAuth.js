import { firebaseAuth } from "./firebase"


//sign up
export const createUser = (email, password) => 
    firebaseAuth.createUserWithEmailAndPassword(email, password);

//sign in
export const signInUser = (email, password) => 
    firebaseAuth.signInWithEmailAndPassword(email, password);

//sign out
export const signOutUser = () => firebaseAuth.signOut();

//reset password
export const passwordReset = (email) => 
    firebaseAuth.sendPasswordResetEmail(email);

//change passward
export const passwordChange = (password) => 
    firebaseAuth.currentUser.updatePassword(password);