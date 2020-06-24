import { createStore } from 'redux';
import { reducer } from '../../reducers/ConstructionJSONArr/ConstructionJSONArr';

const storeConstructionJSONArr = createStore(reducer);

storeConstructionJSONArr.dispatch({
  type: "SET_STATE",
  payload: null
});

export default storeConstructionJSONArr;