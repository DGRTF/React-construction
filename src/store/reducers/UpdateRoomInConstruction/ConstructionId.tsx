import { setConstructionId } from '../../actions/UpdateRoomInConstruction/ConstructionId';

type ActionTypes = ReturnType<typeof setConstructionId>;;

export const reducer = function (state = {
  constructionId: 0
}, action: ActionTypes) {
  switch (action.type) {
    case 'UPDATE_ROOM_IN_CONSTRUCTION_SET_CONSTRUCTION_ID':
      return { ...state, constructionId: action.payload }
    default:
      return state
  }
}