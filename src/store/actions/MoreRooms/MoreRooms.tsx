import { stateType } from '../../store';

export function setSkipQuantityMoreRooms(skipQuantityConstriction: {
  skip: number,
  quantity: number,
  constructionId: number
}[]) {
  return {
    type: GetLiteralInString('MORE_ROOMS_SET_SKIP_QUANTITY'),
    payload: skipQuantityConstriction
  }
}

export function addSkipQuantityMoreRooms(constructionId: number) {
  return {
    type: GetLiteralInString('MORE_ROOMS_ADD_SKIP_QUANTITY'),
    payload: [{
      skip: 0,
      quantity: 10,
      constructionId,
    }]
  }
}

export function editSkipTake(skipQuantityConstriction: {
  skip: number,
  quantity: number,
  constructionId: number
}) {
  return function (dispatch: any) {
    console.warn('object');
    deleteElementSkipTakeMoreRooms(skipQuantityConstriction.constructionId);
    dispatch({
      type: GetLiteralInString('MORE_ROOMS_ADD_SKIP_QUANTITY'),
      payload: [{
        skip: skipQuantityConstriction.skip,
        quantity: skipQuantityConstriction.quantity,
        constructionId: skipQuantityConstriction.constructionId,
      }]
    })
  }
}

export function deleteElementSkipTakeMoreRooms(constructionId: number) {
  return function (dispatch: any, getState: () => stateType) {
    const skipQuantityConstriction = getState().moreRooms.skipQuantityConstriction.slice();
    const reserveSkipQuantityConstriction = skipQuantityConstriction;
    skipQuantityConstriction.forEach(el => {
      if (el.constructionId === constructionId) {
        console.warn('delete');
        const index = reserveSkipQuantityConstriction.indexOf(el);
        if (index > -1)
          reserveSkipQuantityConstriction.splice(index, 1);
      }
    });

    dispatch(setSkipQuantityMoreRooms(reserveSkipQuantityConstriction));
  }
}



function GetLiteralInString<T extends string>(str: T): T {
  return str;
}