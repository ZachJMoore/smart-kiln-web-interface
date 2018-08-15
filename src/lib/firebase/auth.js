import { auth } from "./firebase"


//sign up
export const createUser = (email, password) => 
    auth.createUserWithEmailAndPassword(email, password);

//sign in
export const signInUser = (email, password) => 
    auth.signInWithEmailAndPassword(email, password);

//sign out
export const signOutUser = () => auth.signOut();