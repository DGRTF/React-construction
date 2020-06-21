import { setRoomJSON, setState } from '../../actions/AddEditRoom/RoomJSON';

type ActionTypes = ReturnType<typeof setRoomJSON> | ReturnType<typeof setState>;

export let reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return state = action.state;
    case "SET_ROOMJSON":
        return state = action.roomJSON;
  }
}