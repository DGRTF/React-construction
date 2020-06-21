import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditRoom/CallbackAddRoom';

const storeCallbackAddRoom = createStore(reducer);

storeCallbackAddRoom.dispatch({
  type: "SET_STATE",
  state: {
    UpdateCallBack: null
  }
});

export default storeCallbackAddRoom;