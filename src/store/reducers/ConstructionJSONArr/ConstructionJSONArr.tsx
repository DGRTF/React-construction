import { setConstructionJSONArr } from '../../actions/ConstructionJSONArr/ConstructionJSONArr';

export type ActionTypes = ReturnType<typeof setConstructionJSONArr> ;

export const reducer = function (state = {
  constructionJSONArr: [{
    id: 0,
    name: '',
    address: '',
    haveMachine: false
  }]
}, action: ActionTypes) {
  switch (action.type) {
    case "CONSTRUCTION_JSON_ARR_SET_CONSTRUCTION_JSON":
      return { ...state, constructionJSONArr: action.payload }
    default:
      return state
  }
}



export default reducer;