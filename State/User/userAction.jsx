import { authenticateUser } from "../../APIS/apis";
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  LOGOUT_USER_REQUEST,
} from "./userTypes";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const logoutUserRequest = () => {
  return {
    type: LOGOUT_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const sampleData = authenticateUser();
      dispatch(fetchUserSuccess(sampleData));
    } catch (error) {
      dispatch(fetchUserFailure(error))
    }
  };
};
