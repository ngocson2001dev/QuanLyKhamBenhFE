import axios from "../axios"; //file custom package axios

const hanldeLoginAPI = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const hanldeGetAllUser = (InputId) => {
  return axios.get(`/api/get-all-users?id=${InputId}`);
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-user`, { data: { id: userId } });
}

const editUserService = (user) => {
  return axios.put(`/api/edit-user`, user);
}
const getAllCodeService = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
}
export {
  hanldeLoginAPI,
  hanldeGetAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService
};
