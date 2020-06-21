export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    state
  }
};

export let setConstructionId = function (constructionId: number) {
  return {
    type: GetLiteralInString("SET_CONSTRUCTIONID"),
    constructionId
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}