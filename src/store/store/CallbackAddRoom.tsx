import { createStore } from 'redux';
import { reducer } from './../reducers/CallbackAddRoom';

const storeCallbackAddRoom = createStore(reducer);

storeCallbackAddRoom.dispatch({
  type: "SET_STATE",
  state: {
    UpdateCallBack: null
  }
});

export default storeCallbackAddRoom;