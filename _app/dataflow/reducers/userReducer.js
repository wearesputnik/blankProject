import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../../utils/constants';

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: [],
      };

    default:
      return state;
  }
};
