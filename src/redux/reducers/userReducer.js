const INITIAL_STATE = {
  accountName: "",
  password: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  if (action.type === "SET_USER_INFO") {
    return {
      accountName: action.accountName,
      password: action.password,
    };
  } else return { ...state };
};
