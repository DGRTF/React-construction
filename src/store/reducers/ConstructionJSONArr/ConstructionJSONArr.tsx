import { setConstructionJSONArr, setState } from '../../actions/ConstructionJSONArr/ConstructionJSONArr';

type ActionTypes = ReturnType<typeof setConstructionJSONArr> | ReturnType<typeof setState>;

export const reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "SET_CONSTRUCTION_JSON":
      return { ...state, constructionJSONArr: action.payload }
  }
}