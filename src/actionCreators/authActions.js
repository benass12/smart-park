// import { authRef, provider } from "../config/firebase";
// import { addOrUpdateUserData } from "./usersActions";
import { SYNC_USER } from "./types";

// export const syncUser = () => dispatch => {
//   authRef.onAuthStateChanged(user => {
//     if (user) {
//       const uid = user.uid;
//       const userData = {
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         email: user.email,
//       };

//       addOrUpdateUserData(uid, userData)();

//       dispatch({
//         type: SYNC_USER,
//         payload: {
//           ...userData,
//           uid,
//         },
//       });
//     } else {
//       dispatch({
//         type: SYNC_USER,
//         payload: null,
//       });
//     }
//   });
// };

export const signIn = email => dispatch => {
  dispatch({
    type: SYNC_USER,
    payload: {
      email,
    },
  });
  // authRef
  //   .signInWithPopup(provider)
  //   .then(() => {})
  //   .catch(error => {
  //     console.log(error);
  //     if (error && error.message) {
  //       alert(error.message);
  //     }
  //   });
};

export const signOut = () => dispatch => {
  dispatch({
    type: SYNC_USER,
    payload: null,
  });
  // authRef
  //   .signOut()
  //   .then(() => {})
  //   .catch(error => {
  //     console.log(error);
  //   });
};
