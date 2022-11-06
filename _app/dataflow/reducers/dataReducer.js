import {
  TRANSACTION_INITIATE,
  TRANSACTION_FAILED,
  TRANSACTION_SUCCESS,
  TRANSACTION_CLEAR,
} from '../../utils/constants';

export const dataReducer = (state, action) => {
  switch (action.type) {
    case TRANSACTION_INITIATE:
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
      };
    case TRANSACTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: [],
      };
    case TRANSACTION_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
        data: [],
      };

    default:
      return state;
  }
};
