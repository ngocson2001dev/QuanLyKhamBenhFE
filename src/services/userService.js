import axios from "../axios"; //file custom package axios

const hanldeLoginAPI = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

export { hanldeLoginAPI };
