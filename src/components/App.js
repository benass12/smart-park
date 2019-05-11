import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { push } from "connected-react-router";
import { signOut } from "../actionCreators/authActions";
import { syncUsers } from "../actionCreators/usersActions";
import { syncSharedPlaces } from "../actionCreators/sharedPlacesActions";
import requareAuth from "../utils/requareAuth";
import SharePlace from "./SharePlace";
import ShareOverview from "./ShareOverview";
import Booking from "./Booking";
import SingIn from "./SingIn";
// import "../styles/bootstrap.min.css";
// import "../styles/app.css";

class App extends Component {
  componentWillMount() {
    // this.props.syncUser();
    this.props.syncUsers();
    this.props.syncSharedPlaces();
  }

  render() {
    const { auth } = this.props;

    if (!auth && this.props.location.pathname !== "/singin") {
      this.props.push("/singin");
    }

    return (
      <div>
        {/* <button onClick={() => this.props.push("/share")}>Share</button>
        <button onClick={() => this.props.push("/book")}>Book</button> */}
        {/* {auth && <button onClick={() => this.props.signOut()}>Logout </button>} */}
        <Switch>
          <Route path="/singin" component={SingIn} />
          <Route exact path="/share" component={requareAuth(ShareOverview)} />
          <Route path="/share/place" component={requareAuth(SharePlace)} />
          <Route path="/book" component={requareAuth(Booking)} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ auth, syncSharedPlaces }) {
  return { auth, syncSharedPlaces };
}

export default withRouter(
  connect(
    mapStateToProps,
    { syncSharedPlaces, push, signOut, syncUsers }
  )(App)
);
