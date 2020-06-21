import { setConstructionJSON, setState } from '../../actions/AddEditConstruction/ConstructionJSON';

type ActionTypes = ReturnType<typeof setConstructionJSON> | ReturnType<typeof setState>;

export let reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return state = action.state;
    case "SET_CONSTRUCTIONJSON":
        return state = action.constructionJSON;
  }
}