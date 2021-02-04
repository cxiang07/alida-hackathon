import { setStories } from "./storeAction";
import { useSelector } from "redux";
import axios from "axios";

export const setUserInfo = (accountName, password) => {
  return {
    type: "SET_USER_INFO",
    accountName,
    password,
  };
};

export const userLogin = (username, password) => {
  return function (dispatch) {
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );

    axios
      .get("http://localhost:3444/v1/stories", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(setStories(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
