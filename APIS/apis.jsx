let userInfo = null;

export const logInUser = (data) => {
  userInfo = data;
};

export const logoutUser = () => {
  localStorage.removeItem("userInfo");
  userInfo = null;
};

export const authenticateUser = () => {
  return userInfo;
};
