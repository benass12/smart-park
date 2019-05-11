import {
  sharedPlacesEeRef,
  sharedPlacesLvRef,
  sharedPlacesLtRef,
} from "../config/firebase";

import {
  SYNC_SHARED_PLACES_EE,
  SYNC_SHARED_PLACES_LV,
  SYNC_SHARED_PLACES_LT,
} from "./types";

export const addSharedPlaceEe = sharedPlace => async () => {
  sharedPlacesEeRef.push().set(sharedPlace);
};

export const addSharedPlaceLv = sharedPlace => async () => {
  sharedPlacesLvRef.push().set(sharedPlace);
};

export const addSharedPlaceLt = sharedPlace => async () => {
  sharedPlacesLtRef.push().set(sharedPlace);
};

export const bookSharedPlaceLt = (sharedPlaceId, email) => async () => {
  sharedPlacesLtRef.child(`${sharedPlaceId}/isBooked`).set(true);
  sharedPlacesLtRef.child(`${sharedPlaceId}/bookedBy`).set(email);
};

export const cancelSharedPlaceLt = sharedPlaceId => async () => {
  sharedPlacesLtRef.child(`${sharedPlaceId}/isBooked`).set(false);
  sharedPlacesLtRef.child(`${sharedPlaceId}/bookedBy`).set(null);
};

export const cancelSharingPlaceLt = sharedPlaceId => async () => {
  sharedPlacesLtRef.child(`${sharedPlaceId}`).remove();
  // sharedPlacesLtRef.child(`${sharedPlaceId}/bookedBy`).set(null);
};
export const cancelSharingAllPlacesLt = () => async () => {
  sharedPlacesLtRef.remove();
  // sharedPlacesLtRef.child(`${sharedPlaceId}/bookedBy`).set(null);
};

export const syncSharedPlaces = () => async dispatch => {
  sharedPlacesEeRef.on("value", snapshot => {
    dispatch({
      type: SYNC_SHARED_PLACES_EE,
      payload: snapshot.val(),
    });
  });
  sharedPlacesLvRef.on("value", snapshot => {
    dispatch({
      type: SYNC_SHARED_PLACES_LV,
      payload: snapshot.val(),
    });
  });
  sharedPlacesLtRef.on("value", snapshot => {
    dispatch({
      type: SYNC_SHARED_PLACES_LT,
      payload: snapshot.val(),
    });
  });
};
