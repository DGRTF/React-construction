import {
  setVisibleAddEditRoomForm,
  setRoomJSON,
  setPath,
  setHeaderName,
  setSubmitName,
  setAddEditRoomTemplate
} from '../../actions/AddEditRoom/AddEditRoom';

type ActionTypes = ReturnType<typeof setRoomJSON>
  | ReturnType<typeof setVisibleAddEditRoomForm>
  | ReturnType<typeof setPath>
  | ReturnType<typeof setHeaderName>
  | ReturnType<typeof setSubmitName>
  | ReturnType<typeof setAddEditRoomTemplate>;

export let reducer = function (state = {
  visible: false,
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
    case "ADD_EDIT_ROOM_SET_PATH":
      return { ...state, path: action.payload }
    case "ADD_EDIT_ROOM_SET_HEADER_NAME":
      return { ...state, headerName: action.payload }
    case "ADD_EDIT_ROOM_SET_SUBMIT_NAME":
      return { ...state, submitName: action.payload }
    case 'ADD_EDIT_ROOM_SET_ROOM_TEMPLATE':
      return  { 
        ...state,
        roomJSON: action.payload.roomJSON,
        visible: action.payload.visible,
        headerName: action.payload.headerName,
        submitName: action.payload.submitName, } 
    default:
      return state
  }
}

export default reducer;