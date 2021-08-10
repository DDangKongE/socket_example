import produce from '../../util/produce';
import socketio from 'socket.io-client';

const TEST_REQUEST = 'TEST_REQUEST';
const TEST_SUCCESS = 'TEST_SUCCESS';
const TEST_ERROR = 'TEST_ERROR';

const socket = socketio('http://localhost:3000');

const initialState = {
  testLoading: null,
  testDone: null,
  testList: [],
  testError: null,
};

export const btnClick = () => async (dispatch) => {
  dispatch({ type: TEST_REQUEST });
  try {
    socket.emit('findAllChat', data => {
      console.log(data);
      dispatch({
        type: TEST_SUCCESS,
        payload: data,
      });
    });
  } catch (error) {
    dispatch({
      type: TEST_ERROR,
      payload: error,
    });
  }
};

const test = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TEST_REQUEST:
        draft.testLoading = true;
        draft.testDone = false;
        draft.testError = null;
        break;
      case TEST_SUCCESS:
        draft.testLoading = false;
        draft.testDone = true;
        draft.testList = action.payload;
        break;
      case TEST_ERROR:
        draft.testLoading = false;
        draft.testError = action.payload;
        break;

      default:
        break;
    }
  });

export default test;
