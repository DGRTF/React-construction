import { createStore } from 'redux';
import { reducer } from '../../reducers/DeleteMachinePath/DeleteMachinePath';

const storeDeleteMachinePath = createStore(reducer);

storeDeleteMachinePath.dispatch({
  type: "SET_STATE",
  payload: null
});

export default storeDeleteMachinePath;