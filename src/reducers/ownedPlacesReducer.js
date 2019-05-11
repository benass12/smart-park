import { SYNC_OWNED_PLACES } from "../actionCreators/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SYNC_OWNED_PLACES:
      return action.payload;
    default:
      return state;
  }
};
