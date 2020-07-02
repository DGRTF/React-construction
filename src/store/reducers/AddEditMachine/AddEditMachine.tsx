import {
  setMachineJSON,
  setVisible,
  setHeaderName,
  setSubmitName,
  setPath,
  setEditPath
} from '../../actions/AddEditMachine/AddEditMachine';

type ActionTypes = ReturnType<typeof setMachineJSON> |
  ReturnType<typeof setVisible> |
  ReturnType<typeof setHeaderName> |
  ReturnType<typeof setPath> |
  ReturnType<typeof setSubmitName> |
  ReturnType<typeof setEditPath>;

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
  editPath: ''
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
    default:
      return state
  }
}

export default reducer;