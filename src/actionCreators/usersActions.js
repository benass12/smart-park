import { usersRef } from "../config/firebase";
import { SYNC_USERS } from "./types";

export const deleteUser = userId => async () => {
  console.log("REMOVING USER WITH ID:", userId);
  usersRef.child(userId).remove();
};

export const addOrUpdateUserData = (userId, userData) => async () => {
  console.log("ADDING/UPDATING USER WITH ID", userId, "USER DATA", userData);
  usersRef.child(userId).set(userData);
};

export const addNewUser = userData => async () => {
  console.log("ADDING NEW USER ", userData);
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
