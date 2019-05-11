import { SYNC_REVIEWS } from "../actionCreators/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SYNC_REVIEWS:
      return action.payload;
    default:
      return state;
  }
};
