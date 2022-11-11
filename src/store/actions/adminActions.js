import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

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