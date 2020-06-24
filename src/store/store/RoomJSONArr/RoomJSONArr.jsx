import { createStore } from 'redux';
import { reducer } from '../../reducers/RoomJSONArr/RoomJSONArr';

const storeRoomJSONArr = createStore(reducer);

storeRoomJSONArr.dispatch({
  type: "SET_STATE",
  payload: null
});

export default storeRoomJSONArr;