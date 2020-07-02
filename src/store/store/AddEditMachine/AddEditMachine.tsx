import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditMachine/AddEditMachine';

const storeAddEditMachine = createStore(reducer);

export default storeAddEditMachine;