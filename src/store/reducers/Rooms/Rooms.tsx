import {
  addRooms,
  setRooms
} from '../../actions/Rooms/Rooms';

export type ActionTypes =
  ReturnType<typeof addRooms>
  | ReturnType<typeof setRooms>
  ;

export const roomReducer = function (state: {
  rooms: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean
  }[]
} = { rooms: [] }, action: ActionTypes) {
  switch (action.type) {
    case "ROOMS_ADD_ROOMS":
      return { ...state, rooms: action.payload.concat(state.rooms) }
    case "ROOMS_SET_ROOMS":
      return { ...state, rooms: action.payload }
    default:
      return state
  }
}



export default roomReducer;