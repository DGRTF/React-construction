import { setUpdate } from '../../actions/UpdateRoomInConstruction/UpdateRoomInConstruction';

type ActionTypes = ReturnType<typeof setUpdate>;

export const reducer = function (state = {
  updateFunction: false
}, action: ActionTypes) {
  switch (action.type) {
    case 'UPDATE_ROOM_IN_CONSTRUCTION_SET_UPDATE':
      return { ...state, updateFunction: action.payload }
    default:
      return state
  }
}

export default reducer;