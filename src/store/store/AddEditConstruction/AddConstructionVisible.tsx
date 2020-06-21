import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditConstruction/AddConstructionVisible';

const storeVisibleAddEditConstruction = createStore(reducer);

storeVisibleAddEditConstruction.dispatch({
  type: "SET_STATE",
  state: {
    visible: false
  }
});


export default storeVisibleAddEditConstruction;