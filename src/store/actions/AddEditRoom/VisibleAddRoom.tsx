export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    state
  }
};

export let setVisible = function (visible: boolean) {
  return {
    type: GetLiteralInString("SET_VISIBLE"),
    visible
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}