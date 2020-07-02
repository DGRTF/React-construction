import {
  setMachineJSON,
  setVisible,
  setHeaderName,
  setSubmitName,
  setPath,
  setEditPath,
  setAddPathInConstruction,
  // setAddPathInRoom,
  setDeletePathInConstruction,
  // setDeletePathInRoom,
  setEditPathInConstruction,
  // setEditPathInRoom
} from '../../actions/AddEditMachine/AddEditMachine';

type ActionTypes = ReturnType<typeof setMachineJSON>
  | ReturnType<typeof setVisible>
  | ReturnType<typeof setHeaderName>
  | ReturnType<typeof setPath>
  | ReturnType<typeof setSubmitName>
  | ReturnType<typeof setEditPath>
  | ReturnType<typeof setAddPathInConstruction>
  | ReturnType<typeof setDeletePathInConstruction>
  | ReturnType<typeof setEditPathInConstruction>
  ;

export let reducer = function (state = {
  machineJSON: {
    id: 0,
    name: '',
    createYear: 0,
    roomId: 0
  },
  visible: false,
  headerName: '',
  submitName: '',
  path: '',
  addPath: '',
  editPath: '',
  deletePath: ''
}, action: ActionTypes) {
  switch (action.type) {
    case "ADD_EDIT_MACHINE_SET_MACHINE_JSON":
      console.warn(action.payload); return { ...state, machineJSON: action.payload };
    case 'ADD_EDIT_MACHINE_SET_VISIBLE':
      return { ...state, visible: action.payload }
    case 'ADD_EDIT_MACHINE_SET_HEADER_NAME':
      return { ...state, headerName: action.payload }
    case 'ADD_EDIT_MACHINE_SET_SUBMIT_NAME':
      return { ...state, submitName: action.payload }
    case 'ADD_EDIT_MACHINE_SET_PATH':
      return { ...state, path: action.payload }
    case 'ADD_EDIT_MACHINE_SET_EDIT_PATH':
      return { ...state, editPath: action.payload }
    case 'ADD_EDIT_MACHINE_SET_ADD_PATH':
      return { ...state, addPath: action.payload }
    case 'ADD_EDIT_MACHINE_SET_DELETE_PATH':
      return { ...state, deletePath: action.payload }
    default:
      return state
  }
}

export default reducer;