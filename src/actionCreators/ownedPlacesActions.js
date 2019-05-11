import { ownedPlacesRef } from "../config/firebase";
import { SYNC_OWNED_PLACES } from "./types";

export const addOwnedPlace = ownedPlaceData => async () => {
  ownedPlacesRef.push().set(ownedPlaceData);
};

export const removeOwnedPlace = ownedPlaceId => async () => {
  ownedPlacesRef.child(ownedPlaceId).remove();
};

export const syncOwnedPlaces = () => async dispatch => {
  ownedPlacesRef.on("value", snapshot => {
    dispatch({
      type: SYNC_OWNED_PLACES,
      payload: snapshot.val(),
    });
  });
};
