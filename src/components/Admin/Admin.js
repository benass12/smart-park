import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actionCreators/authActions";
import PropTypes from "prop-types";
import { addNewUser } from "../../actionCreators/usersActions";
import Logo from "../../assets/logo.png";

class Admin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = { username: "", password: "" };

  signIn = () => {
    if (this.state.username === "admin") {
      this.context.router.history.push("/config");
    } else {
      document.getElementById("modalTogler").click();
    }
  };

  handleChange = event => {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };

  render() {
    return (
      <>
        <div className="container">
          <div
            data-toggle="modal"
            data-target="#errorModal"
            id="modalTogler"
            className="hidden"
          />
          <div className="col-xs-6 col-xs-offset-3 login-border">
            <div className="col-md-12 logo center">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="col-md-12">
              <form
                id="admin-form"
                onSubmit={e => {
                  e.preventDefault();
                  this.signIn();
                }}
              >
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="line small" />
                <button type="submit" className="btn btn-primary">
                  SIGN IN
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Error Modal*/}
        <div className="modal fade congratz" id="errorModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
                <p>No such user found!</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps({ auth, users }) {
  return { auth, users };
}

export default connect(
  mapStateToProps,
  { signIn, signOut, addNewUser }
)(Admin);
