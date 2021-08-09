import produce from '../../util/produce';

const TEST_REQUEST = 'TEST_REQUEST';
const TEST_SUCCESS = 'TEST_SUCCESS';
const TEST_ERROR = 'TEST_ERROR';

const initialState = {
  testLoading: null,
  testDone: null,
  testList: 'aaa',
  testError: null,
};

export const btnClick = () => async (dispatch) => {
  dispatch({ type: TEST_REQUEST });
  try {
    dispatch({
      type: TEST_SUCCESS,
      payload: 1111,
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
