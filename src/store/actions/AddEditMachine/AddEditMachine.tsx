import { stateType } from '../../store';

export const setMachineJSON = function (machineJSON: {
  id: number;
  name: string;
  createYear: number;
  roomId: number;
}) {
  return {
    type: GetLiteralInString("ADD_EDIT_MACHINE_SET_MACHINE_JSON"),
    payload: machineJSON
  }
}

export const setVisibleAddEditMachineForm = function (visible: boolean) {
  return {
    type: GetLiteralInString("ADD_EDIT_MACHINE_SET_VISIBLE"),
    payload: visible
  }
}

export const setHeaderName = (headerName: string) => {
  return {
    type: GetLiteralInString("ADD_EDIT_MACHINE_SET_HEADER_NAME"),
    payload: headerName
  }
}

export const setSubmitName = (submitName: string) => {
  return {
    type: GetLiteralInString("ADD_EDIT_MACHINE_SET_SUBMIT_NAME"),
    payload: submitName
  }
}

export const setPath = (path: string) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_PATH'),
    payload: path
  }
}

export const setEditPath = (EditPath: string) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_PATH'),
    payload: EditPath
  }
}

export const setAddPathInRoom = (roomId: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_ADD_PATH'),
    payload: `Machines/AddMachineInRoom?roomId=${roomId}`
  }
}

export const setAddPathInConstruction = (constructionId: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_ADD_PATH'),
    payload: `Machines/AddMachineInConstruction?constructionId=${constructionId}`
  }
}

export const setEditPathInRoom = (roomId: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_EDIT_PATH'),
    payload: `Machines/EditMachineInRoom?roomId=${roomId}`
  }
}

export const setEditPathInConstruction = (constructionId: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_EDIT_PATH'),
    payload: `Machines/EditMachineInConstruction?constructionId=${constructionId}`
  }
}

export const setDeletePathInRoom = (roomId: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_DELETE_PATH'),
    payload: `Machines/DeleteMachineInRoom?roomId=${roomId}`
  }
}

export const setDeletePathInConstruction = (constructionId: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_DELETE_PATH'),
    payload: `Machines/DeleteMachineInConstruction?constructionId=${constructionId}`
  }
}

export function setPathEqualEditPath() {
  return function (dispatch: any, getState: () => stateType) {
    return dispatch(setPath(getState().addEditMachine.editPath))
  }
}

export function setPathEqualAddPath() {
  return function (dispatch: any, getState: () => stateType) {
    return dispatch(setPath(getState().addEditMachine.addPath))
  }
}

export function setMachineTemplate(machineTemplate: {
  visible?: boolean
  machineJSON?: {
    id: number
    name: string
    createYear: number
    roomId: number
  }
  headerName?: string
  submitName?: string
}) {
  return {
    type: GetLiteralInString("ADD_EDIT_MACHINE_SET_MACHINE_TEMPLATE"),
    payload: machineTemplate
  }
}

export function setAddEditDeletePathsInRoom(roomId: number) {
  return {
    type: GetLiteralInString("ADD_EDIT_MACHINE_SET_ADD_EDIT_DELETE-PATHS"),
    payload: {
      addPath: `Machines/AddMachineInRoom?roomId=${roomId}`,
      editPath: `Machines/EditMachineInRoom?roomId=${roomId}`,
      deletePath: `Machines/DeleteMachineInRoom?roomId=${roomId}`,
    }
  }
}

export function setEditDeletePathsInConstruction(constructionId: number) {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_EDIT_DELETE_PATHS'),
    payload: {
      editPath: `Machines/EditMachineInConstruction?constructionId=${constructionId}`,
      deletePath: `Machines/DeleteMachineInConstruction?constructionId=${constructionId}`,
    }
  }
}

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}