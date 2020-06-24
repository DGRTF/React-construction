import { setMachineJSON, setState, setVisible, setHeaderName, setSubmitName, setPath, setEditPath } from '../../actions/AddEditMachine/MachineJSON';

type ActionTypes = ReturnType<typeof setMachineJSON> |
  ReturnType<typeof setState> |
  ReturnType<typeof setVisible> |
  ReturnType<typeof setHeaderName> |
  ReturnType<typeof setPath> |
  ReturnType<typeof setSubmitName> |
  ReturnType<typeof setEditPath>;

// type StateType = ReturnType<typeof {
//   machineJSON: {
//     id: number;
//     name: string;
//     createYear: number;
//     roomId: number;
//   };
//   visible: boolean;
// }>;

export let reducer = function (state: {
  machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  };
  visible: boolean;
  headerName: string;
  submitName: string;
  path: string,
  editPath: string;
}, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "SET_MACHINE_JSON":
      return { ...state, machineJSON: action.payload };
    case 'SET_VISIBLE':
      return { ...state, visible: action.payload }
    case 'SET_HEADER_NAME':
      return { ...state, headerName: action.payload }
    case 'SET_SUBMIT_NAME':
      return { ...state, submitName: action.payload }
    case 'SET_PATH':
      return { ...state, path: action.payload }
    case 'SET_EDIT_PATH':
      return { ...state, editPath: action.payload }
  }
}