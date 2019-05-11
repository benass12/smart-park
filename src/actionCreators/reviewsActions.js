import { reviewsRef } from "../config/firebase";
import { SYNC_REVIEWS } from "./types";

export const addReview = newReview => async () => {
  reviewsRef.push().set(newReview);
};

export const deleteReview = reviewId => async () => {
  reviewsRef.child(reviewId).remove();
};

export const fetchReviews = () => async dispatch => {
  reviewsRef.on("value", snapshot => {
    dispatch({
      type: SYNC_REVIEWS,
      payload: snapshot.val(),
    });
  });
};
