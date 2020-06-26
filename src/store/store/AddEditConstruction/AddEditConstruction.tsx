import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditConstruction/AddEditConstruction';

const storeAddEditConstruction = createStore(reducer);

storeAddEditConstruction.dispatch({
  type: "SET_STATE",
  payload: {
    constructionJSON: {
      id: 0,
      name: '',
      address: ''
    },
    // UpdateCallback: null,
    visible: false,
    headerName: '',
    submitName: '',
    path: '',
    editPath: ''
  }
});

export default storeAddEditConstruction;