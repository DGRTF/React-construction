export const setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    payload: state
  }
}

export const setMachineJSON = function (machineJSON: {
  id: number;
  name: string;
  createYear: number;
  roomId: number;
}) {
  return {
    type: GetLiteralInString("SET_MACHINE_JSON"),
    payload: machineJSON
  }
}

export const setVisible = function (visible: boolean) {
  return {
    type: GetLiteralInString("SET_VISIBLE"),
    payload: visible
  }
}

export const setHeaderName = (headerName: string) => {
  return {
    type: GetLiteralInString("SET_HEADER_NAME"),
    payload: headerName
  }
}

export const setSubmitName = (submitName: string) => {
  return {
    type: GetLiteralInString("SET_SUBMIT_NAME"),
    payload: submitName
  }
}

export const setPath = (path: string) => {
  return {
    type: GetLiteralInString('SET_PATH'),
    payload: path
  }
}

export const setEditPath = (EditPath: string) => {
  return {
    type: GetLiteralInString('SET_EDIT_PATH'),
    payload: EditPath
  }
}

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}