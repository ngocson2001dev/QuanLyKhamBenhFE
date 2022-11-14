import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService, hanldeGetAllUser, deleteUserService, editUserService,
    getTopDoctorHomeService
} from "../../services/userService";
import { toast } from "react-toastify";

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

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await hanldeGetAllUser("all");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }
            else {
                dispatch(fetchAllUsersFailed());
            }

        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchRoleFailed', error);
        }
    }
};

export const fetchAllUsersSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: users,
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIDED,
    data: [],
})

export const createUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
                toast.success("Thêm mới người dùng thành công !")
            }
            else {
                toast.error(res.message);
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

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
                toast.success("Xóa người dùng thành công !")
            }
            else {
                dispatch(deleteUserFailed());
            }

        } catch (error) {
            dispatch(deleteUserFailed());
            console.log(error);
        }
    }
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAIDED,
})

export const editUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
                toast.success("Cập nhật người dùng thành công !")
            }
            else {
                toast.error("Cập nhật người dùng thất bại !")
                dispatch(editUserFailed());
            }

        } catch (error) {
            toast.error("Cập nhật người dùng thất bại !")
            dispatch(editUserFailed());
            console.log(error);
        }
    }
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAIDED,
})


export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data))
            }
            else {
                dispatch(fetchTopDoctorsFailed());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFailed());
            console.log(error);
        }
    }
};

export const fetchTopDoctorsSuccess = (topDoctors) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: topDoctors,
})

export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAIDED,
})
