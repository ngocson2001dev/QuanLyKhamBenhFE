import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { LANGUAGES, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions"

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTopDoctor: [],
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrTopDoctors !== this.props.arrTopDoctors) {
            console.log(' this.props.arrTopDoctors', this.props.arrTopDoctors);
            this.setState({
                arrTopDoctor: this.props.arrTopDoctors,
            })
        }
    }
    render() {
        let listTopDoctors = this.state.arrTopDoctor;
        console.log('listTopDoctors', listTopDoctors);
        let { language } = this.props;
        listTopDoctors = listTopDoctors.concat(listTopDoctors).concat(listTopDoctors).concat(listTopDoctors);
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {
                                listTopDoctors && listTopDoctors.length > 0 &&
                                listTopDoctors.map((item, index) => {
                                    let imageBase64 = CommonUtils.getBase64toImage(item.image);
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                                    return (
                                        <div className="section-customize" key={index}>
                                            <div className="customize-boder">
                                                <div className="outer-bg">
                                                    <div className="bg-img section-outstanding-doctor"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    ></div>
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        arrTopDoctors: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
