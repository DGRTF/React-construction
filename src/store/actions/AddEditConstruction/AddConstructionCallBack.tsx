export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    state
  }
};

export let setCallback = function (UpdateCallback: (constructionJSONArr: {
  id: number;
  name: string;
  address: string;
  haveMachine:boolean;
}[]) => void) {
  return {
    type: GetLiteralInString("SET_CALLBACK"),
    UpdateCallback
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}