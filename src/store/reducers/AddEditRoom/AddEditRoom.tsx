import { setVisible, setRoomJSON, setCallback, setPath, setHeaderName, setSubmitName } from '../../actions/AddEditRoom/AddEditRoom';

type ActionTypes = ReturnType<typeof setRoomJSON>
  | ReturnType<typeof setVisible>
  | ReturnType<typeof setCallback>
  | ReturnType<typeof setPath>
  | ReturnType<typeof setHeaderName>
  | ReturnType<typeof setSubmitName>;

export let reducer = function (state = {
  visible: false,
  UpdateCallback: (roomJSONArr: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  }[]) => { },
  roomJSON: {
    id: 0,
    name: '',
    floor: 0,
    constructionId: 0,
    haveMachine: false,
  },
  headerName: '',
  submitName: '',
  path: ''
}, action: ActionTypes) {
  switch (action.type) {
    case "ADD_EDIT_ROOM_SET_VISIBLE":
      return { ...state, visible: action.payload }
    case "ADD_EDIT_ROOM_SET_ROOM_JSON":
      return { ...state, roomJSON: action.payload }
    case "ADD_EDIT_ROOM_SET_CALLBACK":
      return { ...state, UpdateCallback: action.payload }
    case "ADD_EDIT_ROOM_SET_PATH":
      return { ...state, path: action.payload }
    case "ADD_EDIT_ROOM_SET_HEADER_NAME":
      return { ...state, headerName: action.payload }
    case "ADD_EDIT_ROOM_SET_SUBMIT_NAME":
      return { ...state, submitName: action.payload }
    default:
      return state
  }
}

export default reducer;