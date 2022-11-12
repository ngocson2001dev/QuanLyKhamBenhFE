import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService } from "../../services/userService";

//Fetch dữ liệu từ API lấy danh sách các giới tính

//Thực hiện Fetch data
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed());
            }

        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderFailed', error);
        }
    }
};

//Fetch thành công
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
//Fetch thất bại
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("position");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed());
            }

        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed', error);
        }
    }
};
export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED,
});
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed());
            }

        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed', error);
        }
    }
};
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED,
});

export const createUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess())
            }
            else {
                dispatch(saveUserFailed());
            }

        } catch (error) {
            dispatch(saveUserFailed());
            console.log(error);
        }
    }
};

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAIDED,
})