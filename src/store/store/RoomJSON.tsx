import { createStore } from 'redux';
import { reducer } from './../reducers/RoomJSON';

const storeRoomJSON = createStore(reducer);

storeRoomJSON.dispatch({
  type: "SET_STATE",
  state: null
});

export default storeRoomJSON;