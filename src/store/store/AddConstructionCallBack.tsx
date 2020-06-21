import { createStore } from 'redux';
import { reducer } from './../reducers/AddConstructionCallBack';

const storeCallbackModal = createStore(reducer);

storeCallbackModal.dispatch({
  type: "SET_STATE",
  state: {
    UpdateCallBack: null
  }
});

export default storeCallbackModal;