import { createStore } from 'redux';
import { reducer } from '../../reducers/AddEditRoom/ConstructionId';

const storeConstructionId = createStore(reducer);

storeConstructionId.dispatch({
  type: "SET_STATE",
  state: {
    id: 0
  }
});

export default storeConstructionId;