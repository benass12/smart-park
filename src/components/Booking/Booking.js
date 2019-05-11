import React from "react";
import PropTypes from "prop-types";
import DateUtilities from "../Datepicker/utils";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfmake from "pdfmake/build/pdfmake";
import {
  bookSharedPlaceLt,
  cancelSharedPlaceLt,
} from "../../actionCreators/sharedPlacesActions";
import {
  findUser,
  findUsersBookedPlace,
  isTherePlaceInLt,
} from "../../utils/utils";
import { connect } from "react-redux";
import _ from "lodash";
import Burger from "../../assets/burger.png";
import { signOut } from "../../actionCreators/authActions";

class Booking extends React.Component {
  state = { plate: false };

  handleChange = event => {
    this.setState({ plate: event.target.value });
  };

  handleLogout = () => {
    this.props.signOut();
    var paras = document.getElementsByClassName("modal-backdrop");
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
  };

  generatePdf = () => {
    const { sharedPlaces, auth } = this.props;
    const ltPlaces = sharedPlaces.lt;

    const dataForTable = _.filter(ltPlaces, place => {
      return place.bookedBy === auth.email;
    })
      .sort(function(a, b) {
        return new Date(a.availableAt) - new Date(b.availableAt);
      })
      .map(place => {
        return [
          place.belongsTo,
          place.bookedBy,
          place.placeId,
          place.availableAt,
        ];
      });

    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    pdfmake
      .createPdf({
        content: [
          [
            {
              text: "SMART PARK",
              style: "header",
              alignment: "center",
            },
            {
              text: "BOOKING HISTORY",
              style: "subheader",
              alignment: "center",
            },
            {
              style: "tableExample",
              table: {
                widths: ["*", "*", 35, 70],
                body: [
                  [
                    { text: "Shared by", style: "tableHeader" },
                    { text: "Booked by", style: "tableHeader" },
                    { text: "Place", style: "tableHeader" },
                    { text: "Date", style: "tableHeader" },
                  ],
                  ...dataForTable,
                ],
              },
            },
          ],
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 30],
          },
          subheader: {
            fontSize: 15,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "gray",
          },
        },
      })
      .download();
  };

  handleBooking = () => {
    const { sharedPlaces, auth } = this.props;
    const ltPlaces = sharedPlaces.lt;

    const booked = _.find(ltPlaces, (value, key) => {
      if (
        value.availableAt === DateUtilities.toString(new Date()) &&
        !value.isBooked
      ) {
        this.props.bookSharedPlaceLt(key, auth.email);
        return true;
      }
    });

    if (booked) {
      this.setState({ showCongrats: true });
    }
  };

  handleBookingRelease = () => {
    const { sharedPlaces, auth } = this.props;
    const ltPlaces = sharedPlaces.lt;

    _.find(ltPlaces, (value, key) => {
      if (
        value.availableAt === DateUtilities.toString(new Date()) &&
        value.isBooked &&
        value.bookedBy === auth.email
      ) {
        this.props.cancelSharedPlaceLt(key);
        return true;
      }
    });
  };

  render() {
    const { sharedPlaces, auth, users } = this.props;
    const userData = findUser(users, auth.email);

    const availblePlaces = isTherePlaceInLt(sharedPlaces, true);
    const allSharedPlacesForToday = isTherePlaceInLt(sharedPlaces, false);

    const bookedPlace = findUsersBookedPlace(
      auth.email,
      allSharedPlacesForToday
    );

    if (!this.state.plate) {
      this.setState({ plate: userData.plateNumber });
    }

    return (
      <div className="container">
        <div className="col-md-12 center menu">
          <div
            // type="button"
            data-toggle="modal"
            data-target="#myModal"
            className="hamburger"
          >
            <img src={Burger} alt="Menu Button" />
          </div>
          <h2>{userData.name}</h2>
        </div>
        <div className="col-md-12 plate custom center">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="InputEmail"
                placeholder="Enter your plate number"
                value={this.state.plate && this.state.plate}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" class="btn btn-add">
              <span className="glyphicon glyphicon-plus" />
            </button>
          </form>
        </div>
        <div className="col-md-12 space" />
        <div className="col-md-12 center menu">
          <h2>Your Place For Today</h2>
        </div>
        {bookedPlace ? (
          <div className="col-md-12 plate center date improved">
            {bookedPlace.placeId}
          </div>
        ) : (
          <div className="col-md-12 plate center date improved date--empty">
            {"Available spaces :" +
              (availblePlaces ? " " + availblePlaces.length : " 0")}
          </div>
        )}
        <div className="col-md-12 space" />

        <div className="col-md-12 no-padding">
          {bookedPlace ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                this.handleBookingRelease();
              }}
            >
              Cancel booking
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                this.handleBooking();
              }}
              disabled={!availblePlaces}
            >
              Book
            </button>
          )}
        </div>
        {/* MODAL CONTENT */}
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <button type="submit" class="btn btn-primary">
                  My profile
                </button>
                <div className="col-md-12 space" />
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.generatePdf}
                >
                  Get booking history in PDF
                </button>
                <div className="col-md-12 space" />
                <button type="submit" className="btn btn-primary">
                  Legal
                </button>
                <div className="lng-swircher">
                  <span className="switcher right" />
                  <span className="en">EN</span>
                  <span className="lt">LT</span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary sign--out"
                  onClick={this.handleLogout}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Booking.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = ({ sharedPlaces, auth, users }) => ({
  sharedPlaces,
  auth,
  users,
});

export default connect(
  mapStateToProps,
  { bookSharedPlaceLt, cancelSharedPlaceLt, signOut }
)(Booking);
