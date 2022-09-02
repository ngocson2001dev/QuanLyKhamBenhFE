import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import lodash from 'lodash';
class ModelEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !lodash.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //call API edit User
            this.props.editUser(this.state);
            this.toggle();
        }
    }
    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({ ...copyState });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            { key: 'email', value: 'Email' },
            { key: 'password', value: 'Password' },
            { key: 'firstName', value: 'First Name' },
            { key: 'lastName', value: 'Last Name' },
            { key: 'address', value: 'Address' }];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i].key]) {
                isValid = false;
                toast.error(`${arrInput[i].value} không được để trống !`, { autoClose: 3000 });
                break;
            }
        }
        return isValid;
    }


    render() {
        return (
            <Modal
                className='modal-user-container'
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="Email">Email</label>
                            <input className='input'
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                type="text"
                                name="Email"
                                value={this.state.email}
                                id="Email"
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="Password">Password</label>
                            <input className='input'
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                type="password"
                                value={this.state.password}
                                name="Password"
                                id="Password"
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="firtName">Fist Name</label>
                            <input className='input'
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                type="text"
                                value={this.state.firstName}
                                name="firtName"
                                id="firtName" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="lastName">Last Name</label>
                            <input className='input'
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                                type="text"
                                name="lastName"
                                id="lastName" />
                        </div>
                        <div className="input-container max-w">
                            <label htmlFor="address">Address</label>
                            <input className='input'
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                                type="text"
                                name="address"
                                id="address" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleSaveUser() }}>Save changes</Button>
                    <Button color="secondary" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);





