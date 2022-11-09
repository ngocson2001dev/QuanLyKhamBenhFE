import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        this.props.getAPIGenderStart();
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
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }

    render() {
        let listGender = this.state.genderArr;
        let language = this.props.language;
        return (
            <div className="user-redux-container" >
                <div className="title">
                    User redux manager
                </div>
                <div className="container">
                    <div className="row">
                        <h5><FormattedMessage id="manage-user.add" /></h5>
                        <form className="row g-3">
                            <div className="form-group col-md-3">
                                <label htmlFor="Email"><FormattedMessage id="manage-user.email" /></label>
                                <input type="email" name='email' className="form-control" id="Email" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="Password"><FormattedMessage id="manage-user.password" /></label>
                                <input type="password" name='password' className="form-control" id="Password" placeholder="Password" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="FirstName"><FormattedMessage id="manage-user.firstName" /></label>
                                <input type="text" name='fistName' className="form-control" id="FirstName" placeholder="First name" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="LastName"><FormattedMessage id="manage-user.lastName" /></label>
                                <input type="text" name='lastName' className="form-control" id="LastName" placeholder="Last name" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="PhoneNumber"><FormattedMessage id="manage-user.phoneNumber" /></label>
                                <input type="text" name='phoneNumber' className="form-control" id="PhoneNumber" placeholder="Phone number" />
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="Address"><FormattedMessage id="manage-user.address" /></label>
                                <input type="text" name='address' className="form-control" id="Address" placeholder="Address" />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="Gender" className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                <select id="Gender" className="form-select">
                                    {listGender && listGender.length > 0 &&
                                        listGender.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="Role" className="form-label"><FormattedMessage id="manage-user.role" /></label>
                                <select id="Role" className="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="Image" className="form-label"><FormattedMessage id="manage-user.image" /></label>
                                <input type="text" name='image' className="form-control" id="Image" />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAPIGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
