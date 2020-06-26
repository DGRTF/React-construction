import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditMachine/AddEditMachine';

const storeAddEditMachine = createStore(reducer);

storeAddEditMachine.dispatch({
  type: "SET_STATE",
  payload: {
    machineJSON: {
      id: 0,
      name: '',
      createYear: 0,
      roomId: 0
    },
    visible: false,
    headerName: '',
    submitName: '',
    path: '',
    editPath: ''
  }
});

export default storeAddEditMachine;