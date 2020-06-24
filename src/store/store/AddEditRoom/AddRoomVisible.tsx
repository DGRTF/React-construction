import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditConstruction/AddConstructionVisible';

const storeVisibleAddRoom = createStore(reducer);

storeVisibleAddRoom.dispatch({
  type: "SET_STATE",
  state: {
    visible: false
  }
});


export default storeVisibleAddRoom;