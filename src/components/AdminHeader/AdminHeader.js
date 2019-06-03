import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

class AdminHeader extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="navbar-brand" href="#">
                <span>
                  <img alt="Logo" width="45" height="45" src={Logo} />
                </span>
              </div>
              <h3 className="navbar-text">ADMIN PANEL</h3>
            </div>
            <Link to="/admin" className="btn btn-default navbar-btn pull-right">
              Log out
            </Link>
          </div>
        </nav>
      </>
    );
  }
}

export default AdminHeader;
