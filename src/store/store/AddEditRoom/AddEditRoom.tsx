import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditRoom/AddEditRoom';

const storeAddEditRoom = createStore(reducer);

export default storeAddEditRoom;