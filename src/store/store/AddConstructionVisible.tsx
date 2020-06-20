import { createStore } from 'redux';
import { reducer } from './../reducers/AddConstructionVisible';

const storeVisible = createStore(reducer);
storeVisible.subscribe(()=>console.warn(storeVisible.getState().visible));
storeVisible.subscribe(()=>console.warn(storeVisible.getState()));

storeVisible.dispatch({
  type: "SET_STATE",
  state: {
    visible: false
  }
});


export default storeVisible;