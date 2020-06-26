import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditRoom/AddEditRoom';

const storeAddEditRoom = createStore(reducer);

storeAddEditRoom.dispatch({
  type: "SET_STATE",
  payload: {
    visible: false,
    UpdateCallBack: null,
    roomJSON: {
      id: 0,
      name: '',
      floor: 0,
      constructionId: 0,
      haveMachine: false,
      headerName: '',
      submitName: ''
    }
  }
});


export default storeAddEditRoom;