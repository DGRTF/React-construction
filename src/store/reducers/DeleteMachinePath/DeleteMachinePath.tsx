import { setDeletePath, setState } from '../../actions/DeleteMachinePath/DeleteMachinePath';

type ActionTypes = ReturnType<typeof setDeletePath> | ReturnType<typeof setState>;

export const reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "SET_DELETE_PATH":
      return { ...state, deletePath: action.payload }
  }
}