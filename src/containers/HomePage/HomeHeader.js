import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import './HomeHeader.scss';
import logo from "../../assets/images/logo.svg";
import lgKhamChuyenKhoa from "../../assets/images/khamchuyenkhoa.png";
import lgKhamTuXa from "../../assets/images/khamtuxa.png";
import lgKhamTongQuat from "../../assets/images/khamtongquat.png";
import lgXetNghiemYHoc from "../../assets/images/xetnghiemyhoc.png";
import lgSucKhoeTinhThan from "../../assets/images/suckhoetinhthan.png";
import lgKhamNhaKhoa from "../../assets/images/khamnhakhoa.png";
import lgGoiPhauThuat from "../../assets/images/goiphauthuat.jpg";
import lgSanPhamYTe from "../../assets/images/khamtainha.png";
import lgSucKhoeDoanhNghiep from "../../assets/images/khamnhakhoa.png";
import { Fragment } from "react";
import { FormattedMessage } from 'react-intl'; //Component thay doi ngon ngu
import { LANGUAGES } from "../../utils"
import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        //lấy từ redux
        let language = this.props.language;

        return (
            <Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo " alt="" src={logo} />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.speciality"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.search-doctor"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.health-facility"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-room"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.doctor"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-doctor"></FormattedMessage></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.fee"></FormattedMessage></b></div>
                                <div className="subs-title"><FormattedMessage id="home-header.check-health"></FormattedMessage></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fas fa-question-circle"><FormattedMessage id="home-header.support"></FormattedMessage></i></div>
                            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}> VN</span></div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1"><FormattedMessage id="banner.title1"></FormattedMessage></div>
                        <div className="title2"><FormattedMessage id="banner.title2"></FormattedMessage></div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tìm chuyên khoa..." />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child"><img src={lgKhamChuyenKhoa} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child1"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgKhamTuXa} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child2"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgKhamTongQuat} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child3"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgXetNghiemYHoc} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child4"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgSucKhoeTinhThan} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child5"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgKhamNhaKhoa} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child6"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgGoiPhauThuat} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child7"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgSanPhamYTe} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child8"></FormattedMessage></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgSucKhoeDoanhNghiep} alt="" /></div>
                                <div className="text-child"><FormattedMessage id="banner.child9"></FormattedMessage></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
