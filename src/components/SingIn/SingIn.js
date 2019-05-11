import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actionCreators/authActions";
import PropTypes from "prop-types";
import { addNewUser } from "../../actionCreators/usersActions";
import { findUser } from "../../utils/utils";
import Logo from "../../assets/logo.png";

class Signin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = { email: "" };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };
  componentWillUpdate(nextProps) {
    console.log(
      "nextProps.auth",
      nextProps.auth,
      "nextProps.users ",
      nextProps.users
    );
    if (nextProps.auth) {
      const userData = findUser(nextProps.users, nextProps.auth.email);
      console.log("Found this user: ", userData);
      if (userData) {
        if (userData.placeNumber) {
          this.context.router.history.push("/share");
        } else {
          this.context.router.history.push("/book");
        }
      } else {
        this.props.signOut();
        document.getElementById("modalTogler").click();
        document.getElementById("login-form").reset();
        this.setState({ email: "" });
      }
    }
  }

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
          <div className="col-md-12 logo center">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="col-md-12 login">
            <form
              id="login-form"
              onSubmit={e => {
                e.preventDefault();
                this.props.signIn(this.state.email);
              }}
            >
              <div className="form-group">
                <select className="form-control form-control-sm">
                  <option>EN</option>
                  <option>RU</option>
                  <option>LT</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Username"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
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
)(Signin);
