import { usersRef } from "../config/firebase";
import { SYNC_USERS } from "./types";

export const addOrUpdateUserData = (userId, userData) => async () => {
  console.log("User ID", userId, "User Data", userData);
  usersRef.child(userId).set(userData);
};

export const addNewUser = userData => async () => {
  console.log("User Data", userData);
  usersRef.push().set(userData);
};

export const syncUsers = () => async dispatch => {
  usersRef.on("value", snapshot => {
    dispatch({
      type: SYNC_USERS,
      payload: snapshot.val(),
    });
  });
};
