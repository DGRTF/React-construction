import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditConstruction/ConstructionJSON';

const storeAddEditConstruction = createStore(reducer);

storeAddEditConstruction.dispatch({
  type: "SET_STATE",
  state: null
});

export default storeAddEditConstruction;