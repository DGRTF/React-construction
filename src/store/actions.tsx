export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    state
  }
};

export let addMachine = function (machineJSON: { id: number; name: string; createYear: number; }) {
  return {
    type: GetLiteralInString("ADD_MACHINE"),
    machineJSON
  }
};

export let deleteMachine = function (machineJSON: { id: number; name: string; createYear: number; }) {
  return {
    type: GetLiteralInString("DELETE_MACHINE"),
    machineJSON
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}

// module.exports = { setState, addMachine, deleteMachine }