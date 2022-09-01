import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import { hanldeGetAllUser, } from "../../services/userService";


class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    //callAPI
    await this.getAllUsers();
  }

  getAllUsers = async () => {
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
      <>
        <div className="user-container">
          <div className="title textcenter">Manage users</div>
          <div className="mx-1">
            <button
              className="btn btn-primary px-3">
              <i className="fas fa-user-plus"></i> Add new users</button>
          </div>
          <div className="user-table">
            <table id="customers">
              <thead>
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
              </thead>
              <tbody>
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
                              <i className="fas fa-edit"></i>
                            </button>
                          </td>
                          <td className="text-center">
                            <button className="buton">
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
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
