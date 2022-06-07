import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const userSignupAuth = async (data) => {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
};

export async function userSigninAuth(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}
