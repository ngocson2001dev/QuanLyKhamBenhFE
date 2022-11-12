import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"
import "./TableManageUser.scss"

class TableManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usersRedux: [],
        }
    }
    componentDidMount() {
        this.props.fetchUsersRedux();
    }
    componentDidUpdate(preProps, preState, snapShot) {
        if (preProps.users !== this.props.users)
            this.setState({
                usersRedux: this.props.users
            })
    }
    render() {
        let listUsers = this.state.usersRedux;
        return (
            <>
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
                        {
                            listUsers && listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>{item.roleId}</td>
                                        <td className="text-center">
                                            <button className="buton" >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button className="buton">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
