import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";
import { deleteUser } from "../../actionCreators/usersActions";

import AdminHeader from "../AdminHeader";

class Config extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  deleteUser = id => {
    this.props.deleteUser(id);
  };

  createTable = users => {
    const userProperties = Object.keys(users[Object.keys(users)[0]]).filter(
      key => key !== "password"
    );
    const tableHeaders = userProperties.map(property => {
      return (
        <th key={property}>
          {property
            .split(/(?=[A-Z])/)
            .join(" ")
            .toLowerCase()}
        </th>
      );
    });
    tableHeaders.push(<th key="actions">actions</th>);

    const tableRows = _.map(users, (user, userId) => {
      const tableData = userProperties.map(property => {
        const value = user[property];
        return <td key={value + property + userId}>{value}</td>;
      });
      tableData.push(
        <td key={"td-actions" + userId}>
          <Link to={`/add-edit/${userId}`} className="btn btn-primary btn-xs">
            <i>Update</i>
          </Link>
          <span> </span>
          <button
            className="btn btn-danger btn-xs"
            onClick={this.deleteUser.bind(null, userId)}
          >
            <i>Delete</i>
          </button>
        </td>
      );
      return <tr key={"tr" + userId}>{tableData}</tr>;
    });

    return (
      <table className="table table-condensed table-hover">
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  };

  render() {
    const users = this.props.users;
    if (!users) {
      return null;
    }

    const usersTable = this.createTable(users);

    return (
      <>
        <div className="kodel-viskas-taip-blogai">
          <div className="container">
            <AdminHeader />

            <div
              data-toggle="modal"
              data-target="#errorModal"
              id="modalTogler"
              className="hidden"
            />

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <div className="col-12">
                    USERS LIST
                    <Link
                      to="/add-edit"
                      className="btn btn-primary pannel-btn-circle pull-right"
                    >
                      +
                    </Link>
                  </div>
                </h3>
              </div>
              <div className="panel-body">
                <div className="col-md-12">{usersTable}</div>
              </div>
            </div>
            {/* Error Modal*/}
            <div className="modal fade congratz" id="errorModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      ×
                    </button>
                    <p>No such user found!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(
  mapStateToProps,
  { deleteUser }
)(Config);
