import { setDeletePath } from '../../actions/DeleteMachinePath/DeleteMachinePath';

type ActionTypes = ReturnType<typeof setDeletePath>;

export const reducer = function (state: any = {
  deletePath: ''
}, action: ActionTypes) {
  switch (action.type) {
    case "DELETE_MACHINE_PATH_SET_DELETE_PATH":
      return { ...state, deletePath: action.payload }
    default:
      return state
  }
}

export default reducer;