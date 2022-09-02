import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import { hanldeGetAllUser, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModelUser from "./ModelUser";
import ModelEditUser from "./ModelEditUser";
import { toast } from "react-toastify";


class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {}
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

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    })
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }

  createNewUser = async (data) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success(res.message, { autoClose: 3000 });
        this.getAllUsers();
        this.setState({
          isOpenModalUser: false
        })
      } else {
        toast.error(res.message, { autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Thêm mới User thất bại.Hệ thống đã xảy ra lỗi!', { autoClose: 3000 });
      console.log(error);
    }

  }

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        toast.success(res.message, { autoClose: 3000 });
        this.getAllUsers();
      }
      else {
        toast.error(res.message, { autoClose: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    })
  }

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    })
  }

  editUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        toast.success(res.message, { autoClose: 3000 });
        this.getAllUsers();
      }
      else {
        toast.error(res.message, { autoClose: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let listUsers = this.state.listUsers;
    return (
      <>
        <ModelUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser &&
          <ModelEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.editUser}
          />
        }
        <div className="user-container">
          <div className="title textcenter">Manage users</div>
          <div className="mx-1">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}>
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
                          <td>{item.firstName}</td>
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
                            <button className="buton" onClick={() => this.handleEditUser(item)}>
                              <i className="fas fa-edit"></i>
                            </button>
                          </td>
                          <td className="text-center">
                            <button className="buton" onClick={() => this.handleDeleteUser(item)}>
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
