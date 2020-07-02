import { createStore } from 'redux';
import { reducer } from '../../reducers/DeleteMachinePath/DeleteMachinePath';

const storeDeleteMachinePath = createStore(reducer);

export default storeDeleteMachinePath;