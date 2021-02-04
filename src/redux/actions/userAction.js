import { setStories } from "./storeAction";

const axios = require("axios");

export const userLogin = (username, password, history) => {
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
        dispatch(setStories(res.data));
        history.push("/stories");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
