import React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { addSharedPlaceLt } from "../../actionCreators/sharedPlacesActions";
import { findUser } from "../../utils/utils";
import DatePicker from "../Datepicker";
import DateUtilities from "../Datepicker/utils";

class SharePlace extends React.Component {
  goHome = () => {
    this.props.push("/");
  };

  handleSubmit = dates => {
    console.log("selected dates ", dates);
    const { auth, users } = this.props;
    const userData = findUser(users, auth.email);
    if (!userData || !userData.placeNumber) {
      this.props.push("/book");
    }

    const shareDays = dates.map(date => {
      console.log(DateUtilities.toString(date));
      return {
        placeId: userData.placeNumber,
        belongsTo: this.props.auth.email,
        availableAt: DateUtilities.toString(date),
        fullDate: date,
        bookedBy: null,
        isBooked: false,
      };
    });

    //TODO: Place country should be passed from outside
    const placeCountry = "LT";

    switch (placeCountry) {
      case "LT":
        shareDays.forEach(element => {
          console.log("Adding shared day", element);
          this.props.addSharedPlaceLt(element);
        });
        break;
      default:
    }

    this.props.push("/share");
  };

  render() {
    return (
      <DatePicker
        open={true}
        onCancel={this.goHome}
        onSubmit={this.handleSubmit}
        minDate={new Date()}
      />
    );
  }
}

const mapStateToProps = ({ auth, users }) => {
  return { auth, users };
};

export default connect(
  mapStateToProps,
  { push, addSharedPlaceLt }
)(SharePlace);
