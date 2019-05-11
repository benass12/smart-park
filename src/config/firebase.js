import * as firebase from "firebase";

// import { FirebaseConfig } from "../config/keys";

firebase.initializeApp({
  apiKey: "AIzaSyCOXUTTHhGZe_QW2xgRhIxvro5PJYOC6Qw",
  authDomain: "luminor-park.firebaseapp.com",
  databaseURL: "luminor-park.firebaseio.com",
});

export const databaseRef = firebase.database().ref();
export const provider = new firebase.auth.GoogleAuthProvider();
export const authRef = firebase.auth();
export const usersRef = databaseRef.child("users"); // If changed, usersActions.js should be updated
export const ownedPlacesRef = databaseRef.child("ownedPlaces");
export const sharedPlacesEeRef = databaseRef.child("sharedPlacesEe");
export const sharedPlacesLvRef = databaseRef.child("sharedPlacesLv");
export const sharedPlacesLtRef = databaseRef.child("sharedPlacesLt");
export const reviewsRef = databaseRef.child("reviews");
