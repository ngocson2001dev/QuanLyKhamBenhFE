import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { hanldeLoginAPI } from "../../services/userService";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
      isShowPassword: false,
    };
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.handleLogin();
      }
    });
  }

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleOnChangePasswrord = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await hanldeLoginAPI(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.errMessage,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 p-0 text-login">Login</div>
            <div className="col-12 p-0 form-group login-input">
              <label>User name:</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control"
                value={this.state.username}
                onChange={(e) => this.handleOnChangeUsername(e)}
              />
            </div>
            <div className="col-12 p-0 form-group login-input">
              <label>Password:</label>
              <div className="custom-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="form-control"
                  value={this.state.password}
                  onChange={(e) => this.handleOnChangePasswrord(e)}
                />
                <i
                  class={
                    this.state.isShowPassword
                      ? "fas fa-eye"
                      : "fas fa-eye-slash"
                  }
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                ></i>
              </div>
            </div>
            <div className="col-12 text-danger">{this.state.errMessage}</div>
            <div className="col-12 p-0">
              <button
                className="btn-login w-100"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span>Forgot your password?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-center">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i class="fab fa-google-plus-g google"></i>
              <i class="fab fa-facebook-f facebook"></i>
            </div>
            <div className="col-12 social-login"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
