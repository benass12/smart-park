import { SYNC_USERS } from "../actionCreators/types";

export default (state = false, action) => {
  switch (action.type) {
    case SYNC_USERS:
      return action.payload || null;
    default:
      return state;
  }
};
