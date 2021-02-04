import { setStories } from "./storeAction";
import { useSelector } from "react-redux";

const axios = require('axios');

// export const setUserInfo = (accountName, password) => {
//   return {
//     type: "SET_USER_INFO",
//     accountName,
//     password,
//   };  
// };

export const userLogin = (username, password) => {
  return function (dispatch) {
    // const userInfo = useSelector((state) => state.userInfo);

    const config = { headers: 'Authorization: Basic username:password' };
    const userInfo = {
       username,
       password,
    };

    axios
      .put("/stories", userInfo, config)
      .then((res) => {
        dispatch(setStories(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
