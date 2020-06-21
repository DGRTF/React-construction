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
    type: GetLiteralInString("SET_CONSTRUCTIONJSON"),
    constructionJSON
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}