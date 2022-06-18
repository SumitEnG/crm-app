import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const dataOfUser = JSON.parse(localStorage.getItem("dataOfUser"));

export const fetchUserDetails = async () => {
  return await axios.get(`${BASE_URL}/crm/api/v1/users`, {
    headers: {
      "x-access-token": dataOfUser.accessToken,
    },
  });
};

export const editUserDetails = async (userId, updatedDataObj) => {
  return await axios.put(`${BASE_URL}/crm/api/v1/users/${userId}`, {
    headers: {
      "x-access-token": dataOfUser.accessToken,
    },
  });
};
