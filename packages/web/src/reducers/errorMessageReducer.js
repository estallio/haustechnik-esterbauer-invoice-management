import * as Actions from '../actions';

const initialErrorMessage = null;

const errorReducer = (state = initialErrorMessage, action) => {
  const { type, error } = action;

  if (type === Actions.RESET_ERROR_MESSAGE_ACTION) {
    return null;
  }

  if (error) {
    return error;
  }

  return state;
};

export default errorReducer;
