import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { findUser, findUsersSharedPlaces } from "../../utils/utils";
import { push } from "connected-react-router";
import Burger from "../../assets/burger.png";
import { cancelSharingPlaceLt } from "../../actionCreators/sharedPlacesActions";
import { signOut } from "../../actionCreators/authActions";
import DateUtilities from "../Datepicker/utils";
import _ from "lodash";

class ShareOverview extends Component {
  state = {
    showedCongrats: false,
  };
  handleLogout = () => {
    this.props.signOut();
    var paras = document.getElementsByClassName("modal-backdrop");
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
  };

  openCat = () => {
    setTimeout(function() {
      document.getElementById("cat-cat").click();
    }, 1000);
  };

  handleSharedPlaceRelease = date => {
    const { sharedPlaces } = this.props;
    const ltPlaces = sharedPlaces.lt;

    _.find(ltPlaces, (value, key) => {
      if (value.availableAt === date) {
        this.props.cancelSharingPlaceLt(key);
        return true;
      }
    });
  };

  handleAllUpcomingSharedPlaceRelease = () => {
    const { sharedPlaces } = this.props;
    const ltPlaces = sharedPlaces.lt;

    _.forEach(ltPlaces, (sharedPlace, key) => {
      console.log(sharedPlace);
      const dateNow = new Date();
      const dateSharing = new Date(sharedPlace.availableAt);

      if (DateUtilities.isSameDayOrAfter(dateSharing, dateNow)) {
        this.props.cancelSharingPlaceLt(key);
        return true;
      }
    });
  };

  renderSharedPlaces = sharedPlacesByUser => {
    return sharedPlacesByUser
      .filter(sharedPlace => {
        const dateNow = new Date();
        const dateSharing = new Date(sharedPlace.availableAt);
        return DateUtilities.isSameDayOrAfter(dateSharing, dateNow);
      })
      .map((sharedPlace, idx) => {
        return (
          <div
            className={
              "col-md-12 plate center date" +
              (sharedPlace.isBooked ? " active" : "")
            }
          >
            <span
              className="glyphicon glyphicon-remove"
              onClick={this.handleSharedPlaceRelease.bind(
                null,
                sharedPlace.availableAt
              )}
            />
            <p className="calendar">{sharedPlace.availableAt}</p>
          </div>
        );
      });
  };

  render() {
    const { sharedPlaces, auth, users } = this.props;

    if (
      this.isLoading &&
      this.props.users &&
      this.props.auth &&
      this.props.sharedPlaces
    ) {
      this.setState({ isLoading: "false" });
    }
    const userData = findUser(users, auth.email);
    if (!userData || !userData.placeNumber) {
      this.props.push("/book");
    }
    console.log("SHARED PLACES :", sharedPlaces);

    const sharedPlacesByUser = findUsersSharedPlaces(
      auth.email,
      sharedPlaces.lt
    );
    console.log("SHARED PLACES :", sharedPlacesByUser);

    const renderedList = this.renderSharedPlaces(sharedPlacesByUser);

    if (renderedList.length !== 0 && !this.state.showedCongrats) {
      this.setState({ showedCongrats: true });
      this.openCat();
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
            <img src={Burger} alt="Menu" />
          </div>
          <div
            // type="button"
            data-toggle="modal"
            data-target="#catCat"
            id="cat-cat"
            className="cat-cat"
          />
          <h2>{userData.name}</h2>
        </div>
        <div className="col-md-12 center menu">
          <h2>My place</h2>
        </div>
        <div className="col-md-12 plate center">
          <h3>{userData.placeNumber}</h3>
        </div>
        <div className="col-md-12 space" />
        <div className="col-md-12 center menu">
          <h2>Active shares</h2>
        </div>
        {renderedList.length !== 0 ? (
          renderedList
        ) : (
          <div className="col-md-12 plate center date date--empty">
            <span className="glyphicon glyphicon-minus" />
          </div>
        )}
        <div className="col-md-12 space" />

        <div className="col-md-12 no-padding">
          {renderedList.length !== 0 ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.handleAllUpcomingSharedPlaceRelease()}
            >
              Cancel all
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.props.push("/share/place")}
            >
              Share
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
                <button type="submit" className="btn btn-primary">
                  My profile
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
        {/* CAT MODAL*/}
        <div
          className="modal fade congratz"
          id="catCat"
          role="dialog"
          // style="display: none;"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
                <p>Congratulations! You have made grumpy cat happy again</p>
              </div>
              <div className="modal-body">
                <img src="assets/grumpy.png" alt="Laughing cat" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="reviews-list-container">
              <h1>Share your parking place!</h1>
              <div>
                Your Place Number Is : {}
                <br />
                <button onClick={() => this.props.push("/share/place")}>
                  Share This
                </button>
              </div>
            </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, users, sharedPlaces }) => {
  return {
    auth,
    users,
    sharedPlaces,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { push, signOut, cancelSharingPlaceLt }
  )(ShareOverview)
);
