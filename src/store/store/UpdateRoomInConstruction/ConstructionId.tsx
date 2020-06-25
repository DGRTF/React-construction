import { createStore } from 'redux';
import { reducer } from '../../reducers/UpdateRoomInConstruction/ConstructionId';

const storeConstructionIdUpdate = createStore(reducer);

storeConstructionIdUpdate.dispatch({
  type: "SET_STATE",
  payload: null
});

export default storeConstructionIdUpdate;