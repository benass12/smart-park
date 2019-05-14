import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  addNewUser,
  addOrUpdateUserData,
  deleteUser,
} from "../../actionCreators/usersActions";
import Logo from "../../assets/logo.png";

class Config extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  addUser = () => {
    const newUser = {
      email: "vaidas@gmail.com",
      name: "Vaidas Mileikis",
      placeNumber: 120,
      plateNumber: "SHV-483",
    };
    this.props.addNewUser(newUser);
  };

  updateUser = (id, updatedUser) => {
    updatedUser = {
      email: "vaidas@gmail.com",
      name: "Vaidas UPDATED",
      placeNumber: 120,
      plateNumber: "SHV-483",
    };
    this.props.addOrUpdateUserData(id, updatedUser);
  };

  deleteUser = id => {
    this.props.deleteUser(id);
  };

  createTable = users => {
    const userProperties = Object.keys(users[Object.keys(users)[0]]);
    const tableHeaders = userProperties.map(property => {
      return <th key={property}>{property}</th>;
    });
    tableHeaders.push(<th key="actions">actions</th>);

    const tableRows = _.map(users, (user, userId) => {
      const tableData = userProperties.map(property => {
        const value = user[property];
        return <td key={value + userId}>{value}</td>;
      });
      tableData.push(
        <td key={"tr-actions" + userId}>
          <button onClick={this.updateUser.bind(null, userId)}>
            <i>Update</i>
          </button>
          <button onClick={this.deleteUser.bind(null, userId)}>
            <i>Delete</i>
          </button>
        </td>
      );
      return <tr key={userId}>{tableData}</tr>;
    });

    return (
      <table className="table">
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
        <div className="container kodel-viskas-taip-blogai">
          <div
            data-toggle="modal"
            data-target="#errorModal"
            id="modalTogler"
            className="hidden"
          />
          <div className="col-md-3 logo center">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="col-md-9">ADMIN PANEL</div>
          <div className="col-md-12">
            {usersTable}
            <button onClick={this.addUser}>
              <i>Add</i>
            </button>
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

function mapStateToProps({ users }) {
  return { users };
}

export default connect(
  mapStateToProps,
  { addNewUser, addOrUpdateUserData, deleteUser }
)(Config);
