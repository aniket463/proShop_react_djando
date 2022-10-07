import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
} from "../constants/orderConstants";


export const orderCreateReducer = (state = {}, acttion) => {
  switch (acttion.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: acttion.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: acttion.payload,
      };

    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
