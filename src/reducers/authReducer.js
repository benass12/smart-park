import { SYNC_USER } from "../actionCreators/types";

export default (state = false, action) => {
  switch (action.type) {
    case SYNC_USER:
      return action.payload || null;
    default:
      return state;
  }
};
