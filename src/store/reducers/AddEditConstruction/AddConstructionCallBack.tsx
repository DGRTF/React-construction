import { setCallback, setState } from '../../actions/AddEditConstruction/AddConstructionCallBack';

type ActionTypes = ReturnType<typeof setCallback> | ReturnType<typeof setState>;

export let reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return state = action.state;
    case "SET_CALLBACK":
        return state.UpdateCallBack = action.UpdateCallback;
  }
}