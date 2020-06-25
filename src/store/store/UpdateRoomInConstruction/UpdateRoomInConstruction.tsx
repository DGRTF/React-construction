import { createStore } from 'redux';
import { reducer } from '../../reducers/UpdateRoomInConstruction/UpdateRoomInConstruction';

const storeUpdate = createStore(reducer);

storeUpdate.dispatch({
  type: "SET_STATE",
  payload: null
});

export default storeUpdate;