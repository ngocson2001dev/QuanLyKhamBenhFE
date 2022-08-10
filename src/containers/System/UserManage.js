import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { hanldeGetAllUser } from "../../services/userService";
import logger from "redux-logger";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: [],
    };
  }

  async componentDidMount() {
    let response = await hanldeGetAllUser("all");
    if (response && response.errCode === 0) {
      this.setState({
        listUsers: response.users,
      });
    }
  }

  render() {
    let listUsers = this.state.listUsers;
    return (
      <div className="user-container">
        <div className="title textcenter">Manage users</div>
        <div className="user-table">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Gender</th>
              <th>Phone number</th>
              <th>Address</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {listUsers &&
              listUsers.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.fisrstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.gender === 1 ? "Male" : "Female"}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.address}</td>
                      <td>
                        {item.roleId === "1"
                          ? "Admin"
                          : item.roleId === "2"
                          ? "Docter"
                          : "Patient"}
                      </td>
                      <td className="text-center">
                        <button className="buton">
                          <i class="fas fa-edit"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        <button className="buton">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
