import {
  SYNC_SHARED_PLACES_EE,
  SYNC_SHARED_PLACES_LV,
  SYNC_SHARED_PLACES_LT,
} from "../actionCreators/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SYNC_SHARED_PLACES_EE:
      return {
        ...state,
        ee: action.payload,
      };
    case SYNC_SHARED_PLACES_LV:
      return {
        ...state,
        lv: action.payload,
      };
    case SYNC_SHARED_PLACES_LT:
      return {
        ...state,
        lt: action.payload,
      };
    default:
      return state;
  }
};
