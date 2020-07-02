import { createStore } from 'redux';
import { reducer } from '../../reducers/UpdateRoomInConstruction/UpdateRoomInConstruction';

const storeUpdate = createStore(reducer);

export default storeUpdate;