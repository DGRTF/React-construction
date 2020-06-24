export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    state
  }
};

export let addMachine = function (machineJSON: { id: number; name: string; createYear: number; roomId: number; }) {
  return {
    type: GetLiteralInString("ADD_MACHINE"),
    machineJSON
  }
};

export let deleteMachine = function (machineJSON: { id: number; name: string; createYear: number; roomId: number;}) {
  return {
    type: GetLiteralInString("DELETE_MACHINE"),
    machineJSON
  }
};

export let setMachineArr = function (machineJSONArr: { id: number; name: string; createYear: number; roomId: number;}[]) {
  return {
    type: GetLiteralInString("SET_MACHINEARR"),
    machineJSONArr
  }
};

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}