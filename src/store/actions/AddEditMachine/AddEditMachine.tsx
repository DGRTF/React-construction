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

export const setVisible = function (visible: boolean) {
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

export const setAddPathInRoom = (id: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_ADD_PATH'),
    payload: `Machines/AddMachineInRoom?roomId=${id}`
  }
}

export const setAddPathInConstruction = (id: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_ADD_PATH'),
    payload: `Machines/AddMachineInConstruction?constructionId=${id}`
  }
}

export const setEditPathInRoom = (id: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_EDIT_PATH'),
    payload: `Machines/EditMachineInRoom?roomId=${id}`
  }
}

export const setEditPathInConstruction = (id: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_EDIT_PATH'),
    payload: `Machines/EditMachineInConstruction?constructionId=${id}`
  }
}

export const setDeletePathInRoom = (id: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_DELETE_PATH'),
    payload: `Machines/DeleteMachineInRoom?roomId=${id}`
  }
}

export const setDeletePathInConstruction = (id: number) => {
  return {
    type: GetLiteralInString('ADD_EDIT_MACHINE_SET_DELETE_PATH'),
    payload: `Machines/DeleteMachineInConstruction?constructionId=${id}`
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

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}