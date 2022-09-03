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


class HomeHeader extends Component {

    render() {
        return (
            <Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i class="fas fa-bars"></i>
                            <img className="header-logo " alt="" src={logo} />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b>Chuyên khoa</b></div>
                                <div className="subs-title">Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className="child-content">
                                <div><b>Cơ sở y tế</b></div>
                                <div className="subs-title">Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className="child-content">
                                <div><b>Bác sĩ</b></div>
                                <div className="subs-title">Chọn bác sĩ giỏi</div>
                            </div>
                            <div className="child-content">
                                <div><b>Gói khám</b></div>
                                <div className="subs-title">Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i class="fas fa-question-circle">Hỗ trợ</i></div>
                            <div className="language-vi">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1">NỀN TẢNG Y TẾ</div>
                        <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className="search">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Tìm chuyên khoa..." />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="option">
                            <div className="option-child">
                                <div className="icon-child"><img src={lgKhamChuyenKhoa} alt="" /></div>
                                <div className="text-child">Khám chuyên khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgKhamTuXa} alt="" /></div>
                                <div className="text-child">Khám từ xa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgKhamTongQuat} alt="" /></div>
                                <div className="text-child">Khám tổng quát</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgXetNghiemYHoc} alt="" /></div>
                                <div className="text-child">Xét nghiệm y học</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgSucKhoeTinhThan} alt="" /></div>
                                <div className="text-child">Sức khỏe tinh thần</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgKhamNhaKhoa} alt="" /></div>
                                <div className="text-child">Khám nha khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgGoiPhauThuat} alt="" /></div>
                                <div className="text-child">Gói phẫu thuật</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgSanPhamYTe} alt="" /></div>
                                <div className="text-child">Sản phẩm y tế</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><img src={lgSucKhoeDoanhNghiep} alt="" /></div>
                                <div className="text-child">Sức khỏe doanh nghiệp</div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
