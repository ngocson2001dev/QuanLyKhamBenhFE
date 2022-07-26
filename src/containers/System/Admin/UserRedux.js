import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from '../Admin/TableManageUser'

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getAPIGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }

        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //nếu props quá khứ khác props hiện tại re-render
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        //Reset value input
        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;

            this.setState({
                previewImgURL: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                userEditId: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangeImage = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getImageToBase64(file)
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectURL,
                avatar: base64,
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        if (this.state.action === CRUD_ACTIONS.CREATE) {
            this.props.createUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.avatar
            });
        }
        if (this.state.action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                id: this.state.userEditId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                roleId: this.state.role,
                positionId: this.state.position,
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                image: this.state.avatar,
            });
        }


    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(`This input is required: ${arrCheck[i]}`);
                break;
            }
        }
        return isValid;
    }

    handleEditUserParent = (data) => {
        let imageBase64 = '';
        console.log(data.image);
        if (data.image) {
            imageBase64 = CommonUtils.getBase64toImage(data.image);
        }
        this.setState({
            email: data.email,
            password: "password",
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            address: data.address,
            role: data.roleId,
            position: data.positionId,
            previewImgURL: imageBase64,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: data.id
        },);
    }
    render() {
        let listGender = this.state.genderArr;
        let listRole = this.state.roleArr;
        let listPosition = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        return (
            <div className="user-redux-container" >
                <div className="title">
                    User redux manager
                </div>
                <div className="container">
                    <div className="row">
                        <h5><FormattedMessage id="manage-user.add" /></h5>
                        <h6>{isLoadingGender === true ? "loading data..." : ""}</h6>
                        <form className="row g-3">
                            <div className="form-group col-md-3">
                                <label htmlFor="Email"><FormattedMessage id="manage-user.email" /></label>
                                <input type="email" className="form-control" id="Email" placeholder="Email"
                                    name='email'
                                    value={email}
                                    onChange={(e) => this.onChangeInput(e, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="Password"><FormattedMessage id="manage-user.password" /></label>
                                <input type="password" className="form-control" id="Password" placeholder="Password"
                                    name='password'
                                    value={password}
                                    onChange={(e) => this.onChangeInput(e, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="FirstName"><FormattedMessage id="manage-user.firstName" /></label>
                                <input type="text" className="form-control" id="FirstName" placeholder="First name"
                                    name='firstName'
                                    value={firstName}
                                    onChange={(e) => this.onChangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="LastName"><FormattedMessage id="manage-user.lastName" /></label>
                                <input type="text" className="form-control" id="LastName" placeholder="Last name"
                                    name='lastName'
                                    value={lastName}
                                    onChange={(e) => this.onChangeInput(e, 'lastName')}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="PhoneNumber"><FormattedMessage id="manage-user.phoneNumber" /></label>
                                <input type="text" className="form-control" id="PhoneNumber" placeholder="Phone number"
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="Address"><FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control" id="Address" placeholder="Address"
                                    name='address'
                                    value={address}
                                    onChange={(e) => this.onChangeInput(e, 'address')}
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="Gender" className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                <select id="Gender" className="form-select"
                                    value={gender}
                                    onChange={(e) => this.onChangeInput(e, 'gender')}
                                >
                                    {listGender && listGender.length > 0 &&
                                        listGender.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="Position" className="form-label"><FormattedMessage id="manage-user.position" /></label>
                                <select id="Position" className="form-select"
                                    onChange={(e) => this.onChangeInput(e, 'position')}
                                    value={position}
                                >
                                    {listPosition && listPosition.length > 0 &&
                                        listPosition.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="Role" className="form-label"><FormattedMessage id="manage-user.role" /></label>
                                <select id="Role" className="form-select"
                                    onChange={(e) => this.onChangeInput(e, 'role')}
                                    value={role}
                                >
                                    {listRole && listRole.length > 0 &&
                                        listRole.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="Image" className="form-label"><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' hidden type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className='lable-upload' htmlFor="previewImg">Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="col-12">
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                onClick={() => this.handleSaveUser()}
                            >
                                {
                                    this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id={"manage-user.edit"} /> :
                                        <FormattedMessage id={"manage-user.save"} />
                                }
                            </button>
                        </div>
                    </div>
                    <div className="col-12">
                        <TableManageUser
                            handleEditUser={this.handleEditUserParent}
                            action={this.state.action}
                        />
                    </div>

                    {this.state.isOpen && (
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAPIGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        createUser: (data) => dispatch(actions.createUser(data)),
        editUser: (data) => dispatch(actions.editUser(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
