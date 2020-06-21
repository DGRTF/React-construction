import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditConstruction/ConstructionJSON';

const storeConstructionJSON = createStore(reducer);

storeConstructionJSON.dispatch({
  type: "SET_STATE",
  state: null
});

export default storeConstructionJSON;