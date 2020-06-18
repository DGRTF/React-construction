import { createStore } from 'redux';
import { reducer } from './reducer'

const store = createStore(reducer);

store.dispatch({
  type: "SET_STATE",
  state: {
    machineJSONArr: []
  }
});

export default store;