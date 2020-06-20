import { createStore } from 'redux';
import { reducer } from './../reducers/AddConstructionCallBack';

const store = createStore(reducer);

store.dispatch({
  type: "SET_STATE",
  state: {
    UpdateCallBack: null
  }
});

export default store;