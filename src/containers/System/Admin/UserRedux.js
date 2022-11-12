import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


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
            avatar: ''
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
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
    }

    handleOnChangeImage = (e) => {
        let file = e.target.files[0];
        if (file) {
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectURL,
                avatar: file,
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

        this.props.createUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            roleId: this.state.role,
            positionId: this.state.position
        });

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

    render() {
        let listGender = this.state.genderArr;
        let listRole = this.state.roleArr;
        let listPosition = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;

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
                                    onChange={(e) => this.onChangeInput(e, 'email')}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="Password"><FormattedMessage id="manage-user.password" /></label>
                                <input type="password" className="form-control" id="Password" placeholder="Password"
                                    name='password'
                                    onChange={(e) => this.onChangeInput(e, 'password')}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="FirstName"><FormattedMessage id="manage-user.firstName" /></label>
                                <input type="text" className="form-control" id="FirstName" placeholder="First name"
                                    name='firstName'
                                    onChange={(e) => this.onChangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="LastName"><FormattedMessage id="manage-user.lastName" /></label>
                                <input type="text" className="form-control" id="LastName" placeholder="Last name"
                                    name='lastName'
                                    onChange={(e) => this.onChangeInput(e, 'lastName')}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="PhoneNumber"><FormattedMessage id="manage-user.phoneNumber" /></label>
                                <input type="text" className="form-control" id="PhoneNumber" placeholder="Phone number"
                                    name='phoneNumber'
                                    onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="Address"><FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control" id="Address" placeholder="Address"
                                    name='address'
                                    onChange={(e) => this.onChangeInput(e, 'address')}
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="Gender" className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                <select id="Gender" className="form-select"
                                    onChange={(e) => this.onChangeInput(e, 'gender')}
                                >
                                    {listGender && listGender.length > 0 &&
                                        listGender.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="Position" className="form-label"><FormattedMessage id="manage-user.position" /></label>
                                <select id="Position" className="form-select"
                                    onChange={(e) => this.onChangeInput(e, 'position')}
                                >
                                    {listPosition && listPosition.length > 0 &&
                                        listPosition.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
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
                                >
                                    {listRole && listRole.length > 0 &&
                                        listRole.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
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
                            <button onClick={() => this.handleSaveUser()} className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                        </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAPIGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        createUser: (data) => dispatch(actions.createUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
