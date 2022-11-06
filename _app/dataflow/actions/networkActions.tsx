import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ATTEMPT,
  TRANSACTION_INITIATE,
  TRANSACTION_FAILED,
  TRANSACTION_SUCCESS,
  TRANSACTION_CLEAR,
} from '../../utils/constants';
import axios from '../../utils/axios';

export const dataScan = (
  dispatch: CallableFunction,
  uuid: string,
  cashier_id: number,
  transaction_amount: number,
) => {
  if (transaction_amount === parseInt('0'))
    dispatch(transactionFailed({error: 'Enter amount greater than 0!'}));

  dispatch(transactionInitiate());

  axios
    .get(
      `/qr_scan/?uuid=${uuid}&cashier_id=${cashier_id}&transaction_amount=${transaction_amount}`,
    )
    .then((result) => {
      result.status === 200 &&
        dispatch(transactionSuccess({incoming: result.data}));
    })
    .catch((error) => {
      alert(error);
      dispatch(transactionFailed({error}));
    });
};

export const clearData = (dispatch: CallableFunction) => {
  dispatch(clearTransactions());
};

const transactionInitiate = () => ({
  type: TRANSACTION_INITIATE,
  loading: true,
});
const transactionSuccess = (data) => ({
  type: TRANSACTION_SUCCESS,
  loading: false,
  data: data,
});

const transactionFailed = (error) => ({
  type: TRANSACTION_FAILED,
  loading: false,
  error: error,
});

const clearTransactions = () => ({
  type: TRANSACTION_CLEAR,
});
