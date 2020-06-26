import { setState, setVisible, setRoomJSON, setCallback, setPath, setHeaderName, setSubmitName } from '../../actions/AddEditRoom/AddEditRoom';

type ActionTypes = ReturnType<typeof setRoomJSON>
  | ReturnType<typeof setState>
  | ReturnType<typeof setVisible>
  | ReturnType<typeof setCallback>
  | ReturnType<typeof setPath>
  | ReturnType<typeof setHeaderName>
  | ReturnType<typeof setSubmitName>;

export let reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return action.payload
    case "SET_VISIBLE":
      return { ...state, visible: action.payload }
    case "SET_ROOM_JSON":
      return { ...state, roomJSON: action.payload }
    case "SET_CALLBACK":
      return { ...state, UpdateCallback: action.payload }
    case "SET_PATH":
      return { ...state, path: action.payload }
    case "SET_HEADER_NAME":
      return { ...state, headerName: action.payload }
    case "SET_SUBMIT_NAME":
      return { ...state, submitName: action.payload }
  }
}