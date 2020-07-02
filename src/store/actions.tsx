export let setMachineArr = function (machineJSONArr: { id: number; name: string; createYear: number; roomId: number; }[]) {
  return {
    type: GetLiteralInString("SET_MACHINE_ARR"),
    payload: machineJSONArr
  }
};

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}