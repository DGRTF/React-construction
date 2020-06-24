import { setRoomJSONArr, setState } from '../../actions/RoomJSONArr/RoomJSONArr';

type ActionTypes = ReturnType<typeof setRoomJSONArr> | ReturnType<typeof setState>;

export const reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "SET_ROOM_JSON":
      return { ...state, roomJSONArr: action.payload }
  }
}