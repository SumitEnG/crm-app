import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const dataOfUser = JSON.parse(localStorage.getItem("dataOfUser"));

export const fetchTicketDetails = async () => {
  return await axios.get(
    `${BASE_URL}/crm/api/v1/tickets`,
    {
      headers: {
        "x-access-token": dataOfUser.accessToken,
      },
    },
    {
      userId: dataOfUser.userId,
    }
  );
};

export const editTicketDetails = async (id, updateDataObj) => {
  return await axios.put(
    `${BASE_URL}/crm/api/v1/tickets/${id}`,
    updateDataObj,
    {
      headers: {
        "x-access-token": dataOfUser.accessToken,
      },
    },
    {
      userId: dataOfUser.userId,
    }
  );
};
