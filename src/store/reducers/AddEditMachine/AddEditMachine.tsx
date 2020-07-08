import {
  setMachineJSON,
  setVisibleAddEditMachineForm,
  setHeaderName,
  setSubmitName,
  setPath,
  setEditPath,
  setAddPathInConstruction,
  setAddPathInRoom,
  setDeletePathInConstruction,
  setDeletePathInRoom,
  setEditPathInConstruction,
  setEditPathInRoom,
  setMachineTemplate,
  setAddEditDeletePathsInRoom,
  setEditDeletePathsInConstruction,
} from '../../actions/AddEditMachine/AddEditMachine';

type ActionTypes = ReturnType<typeof setMachineJSON>
  | ReturnType<typeof setVisibleAddEditMachineForm>
  | ReturnType<typeof setHeaderName>
  | ReturnType<typeof setPath>
  | ReturnType<typeof setSubmitName>
  | ReturnType<typeof setEditPath>
  | ReturnType<typeof setAddPathInConstruction>
  | ReturnType<typeof setDeletePathInConstruction>
  | ReturnType<typeof setEditPathInConstruction>
  | ReturnType<typeof setAddPathInRoom>
  | ReturnType<typeof setDeletePathInRoom>
  | ReturnType<typeof setEditPathInRoom>
  | ReturnType<typeof setMachineTemplate>
  | ReturnType<typeof setAddEditDeletePathsInRoom>
  | ReturnType<typeof setEditDeletePathsInConstruction>
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
      return { ...state, machineJSON: action.payload };
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
    case 'ADD_EDIT_MACHINE_SET_MACHINE_TEMPLATE':
     console.warn(action.payload.machineJSON); return {
        ...state,
        visible: action.payload.visible,
        machineJSON: action.payload.machineJSON,
        headerName: action.payload.headerName,
        submitName: action.payload.submitName
      }
    case 'ADD_EDIT_MACHINE_SET_ADD_EDIT_DELETE-PATHS':
      return {
        ...state,
        addPath: action.payload.addPath,
        editPath: action.payload.editPath,
        deletePath: action.payload.deletePath,
      }
    case 'ADD_EDIT_MACHINE_SET_EDIT_DELETE_PATHS':
      return {
        ...state,
        editPath: action.payload.editPath,
        deletePath: action.payload.deletePath,
      }
    default:
      return state
  }
}

export default reducer;