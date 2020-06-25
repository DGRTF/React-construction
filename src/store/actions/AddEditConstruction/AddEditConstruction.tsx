export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    state
  }
};

export let setConstructionJSON = function (constructionJSON: {
  id: number;
  name: string;
  address: string;
}) {
  return {
    type: GetLiteralInString("SET_CONSTRUCTION_JSON"),
    constructionJSON
  }
};

export let setCallback = function (UpdateCallback: (constructionJSONArr: {
  id: number;
  name: string;
  address: string;
  haveMachine:boolean;
}[]) => void) {
  return {
    type: GetLiteralInString("SET_CALL_BACK"),
    UpdateCallback
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