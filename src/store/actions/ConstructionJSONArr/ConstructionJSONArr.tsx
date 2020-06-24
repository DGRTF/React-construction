export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    payload: state
  }
};

export let setConstructionJSONArr = function (constructionJSONArr: {
  id: number;
  name: string;
  floor: number;
  constructionId: number;
  haveMachine: boolean;
}[]) {
  return {
    type: GetLiteralInString("SET_CONSTRUCTION_JSON"),
    payload: constructionJSONArr
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}