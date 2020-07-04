import { setConstructionJSONArr } from '../../actions/ConstructionJSONArr/ConstructionJSONArr';

export type ActionTypes = ReturnType<typeof setConstructionJSONArr>;

export const reducer = function (state: {
  constructionJSONArr: {
    id: number
    name: string
    address: string
    haveMachine: boolean
  }[]
} = { constructionJSONArr: [] }, action: ActionTypes) {
  switch (action.type) {
    case "CONSTRUCTION_JSON_ARR_SET_CONSTRUCTION_JSON":
     console.warn(action.payload); return { ...state, constructionJSONArr: action.payload }
    default:
      return state
  }
}



export default reducer;