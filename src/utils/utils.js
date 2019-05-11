import _ from "lodash";

import DateUtilities from "../components/Datepicker/utils";

export const findUser = (users, email) => {
  return _.find(users, (value, key) => {
    console.log("USERS : ", key, value);
    return value.email === email;
  });
};

export const isTherePlaceInLt = (sharedPlaces, onlyBookable) => {
  console.log(DateUtilities.toString(new Date()));
  if (sharedPlaces && sharedPlaces.lt) {
    const ltPlaces = sharedPlaces.lt;
    const results = _.filter(ltPlaces, (value, key) => {
      console.log("Value: ", value, "Key: ", key);
      const isSameDay = DateUtilities.isSameDay(
        new Date(value.availableAt),
        new Date()
      );
      const notBooked = !value.isBooked;

      return onlyBookable ? isSameDay && notBooked : isSameDay;
    });
    return results;
  } else {
    return false;
  }
};

export const findUsersBookedPlace = (email, sharedPlaces) => {
  return _.find(sharedPlaces, (value, key) => {
    return value.isBooked && value.bookedBy && value.bookedBy === email;
  });
};

export const findUsersSharedPlaces = (email, sharedPlaces) => {
  return _.filter(sharedPlaces, (value, key) => {
    return value.belongsTo === email;
  });
};
