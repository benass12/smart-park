import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import {
  addNewUser,
  addOrUpdateUserData,
  deleteUser,
} from "../../actionCreators/usersActions";

class AddEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = { loaded: false };

  componentWillUpdate(nextProps, nextState) {
    console.log("WILL UPDATE?");
    console.log(nextProps, nextState);
    if (nextProps.users && !nextState.loaded) {
      const { userId } = nextProps.match.params;
      if (userId) {
        console.log(nextProps.users);
        const user = nextProps.users[userId];
        console.log("UPDATE USER", user);
        this.setState({ loaded: true, editMode: true, userId, ...user });
      } else {
        console.log("NEW USER");
        this.setState({
          loaded: true,
          editMode: false,
          email: "",
          name: "",
          password: "",
          placeNumber: "",
          plateNumber: "",
        });
      }
    }
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, name, password, placeNumber, plateNumber } = this.state;

    const newOrUpdatedUser = {
      email,
      name,
      password,
      placeNumber,
      plateNumber,
    };

    if (this.state.editMode) {
      this.props.addOrUpdateUserData(this.state.userId, newOrUpdatedUser);
    } else {
      this.props.addNewUser(newOrUpdatedUser);
    }

    this.context.router.history.push("/config");
  };

  render() {
    if (!this.state.loaded && this.props.users) {
      this.forceUpdate();
      return null;
    } else if (!this.state.loaded) {
      return null;
    }

    console.log(this.state);

    const { email, name, password, placeNumber, plateNumber } = this.state;
    const users = this.props.users;
    if (!users) {
      return null;
    }

    return (
      <div className="kodel-viskas-taip-blogai">
        <div className="container">
          <AdminHeader />
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                {this.state.editMode ? "UPDATE USER" : "ADD USER"}
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    placeholder="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    placeholder="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    placeholder="password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="placeNumber">Place Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="placeNumber"
                    value={placeNumber}
                    onChange={this.onChange}
                    placeholder="place number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="plateNumber">Plate Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="plateNumber"
                    value={plateNumber}
                    onChange={this.onChange}
                    placeholder="plate number"
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <Link to="/config" className="btn btn-primary">
            Back to Users List
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(
  mapStateToProps,
  { addNewUser, addOrUpdateUserData, deleteUser }
)(AddEdit);
