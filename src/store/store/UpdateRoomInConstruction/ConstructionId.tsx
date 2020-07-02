import { createStore } from 'redux';
import { reducer } from '../../reducers/UpdateRoomInConstruction/ConstructionId';

const storeConstructionIdUpdate = createStore(reducer);

export default storeConstructionIdUpdate;