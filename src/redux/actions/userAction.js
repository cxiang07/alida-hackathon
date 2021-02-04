import { setStories } from "./storeAction";
import { useSelector } from "redux";

export const setUserInfo = (accountName, password) => {
  return {
    type: "SET_USER_INFO",
    accountName,
    password,
  };
};

export const userLogin = () => {
  return function (dispatch) {
    const userInfo = useSelector((state) => state.userInfo);
    axios
      .put("/stories", userInfo)
      .then((res) => {
        dispatch(setStories(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
