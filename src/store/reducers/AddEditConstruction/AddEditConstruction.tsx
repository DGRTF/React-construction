import { setConstructionJSON, setState, setCallback, setVisible, } from '../../actions/AddEditConstruction/AddEditConstruction';

type ActionTypes = ReturnType<typeof setConstructionJSON>
  | ReturnType<typeof setState>
  | ReturnType<typeof setVisible>
  | ReturnType<typeof setCallback>;

export let reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return state = action.state;
    case "SET_CONSTRUCTION_JSON":
      return state = action.constructionJSON;
    case "SET_CALL_BACK":
      return state.UpdateCallBack = action.UpdateCallback;
    case "SET_CONSTRUCTION_JSON":
      return state = action.constructionJSON;
  }
}