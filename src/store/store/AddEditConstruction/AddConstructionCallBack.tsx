import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditConstruction/AddConstructionCallBack';

const storeCallbackModal = createStore(reducer);

storeCallbackModal.dispatch({
  type: "SET_STATE",
  state: {
    UpdateCallBack: null
  }
});

export default storeCallbackModal;