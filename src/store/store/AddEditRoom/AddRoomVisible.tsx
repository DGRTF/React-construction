import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditConstruction/AddConstructionVisible';

const storeVisibleAddRoom = createStore(reducer);
storeVisibleAddRoom.subscribe(() => console.warn(storeVisibleAddRoom.getState().visible));
storeVisibleAddRoom.subscribe(() => console.warn(storeVisibleAddRoom.getState()));

storeVisibleAddRoom.dispatch({
  type: "SET_STATE",
  state: {
    visible: false
  }
});


export default storeVisibleAddRoom;