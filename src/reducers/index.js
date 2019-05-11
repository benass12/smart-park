import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import reviewsReducer from "./reviewsReducer";
import ownedPlacesReducer from "./ownedPlacesReducer";
import sharedPlacesReducer from "./sharedPlacesReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    reviews: reviewsReducer,
    ownedPlaces: ownedPlacesReducer,
    sharedPlaces: sharedPlacesReducer,
    users: usersReducer,
  });

export default createRootReducer;
