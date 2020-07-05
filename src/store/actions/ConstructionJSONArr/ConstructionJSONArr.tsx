import { stateType } from '../../store';
import { setSkipMoreConstructions } from '../MoreConstructions/MoreConstructions';
import { setConstructionJSON, setVisibleAddEditConstructionForm } from '../AddEditConstruction/AddEditConstruction';

const skipConstructions = 0;
const quantityConstructions = 10;
const quantityConstructionsStep = 10;


export const setConstructionJSONArr = function (constructionJSONArr: {
  id: number
  name: string
  address: string
  haveMachine: boolean
}[]) {
  return {
    type: GetLiteralInString("CONSTRUCTION_JSON_ARR_SET_CONSTRUCTION_JSON"),
    payload: constructionJSONArr
  }
}

export function getConstructionJSONArr() {
  return function (dispatch: any, getState: () => stateType) {
    const moreConstructions = getState().moreConstructions;
    return fetch(`Constructions/GetConstructions?skip=${moreConstructions.skip}&take=${moreConstructions.quantity}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => dispatch(setConstructionJSONArr(json)))
  }
}

export function addEditConstruction(formData: FormData) {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setConstructionJSON(null));
    dispatch(setVisibleAddEditConstructionForm(false));
    const moreConstructions = getState().moreConstructions;
    return fetch(`${getState().addEditConstruction.path}?skip=${moreConstructions.skip}&take=${moreConstructions.quantity}`, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(json => dispatch(setConstructionJSONArr(json)))
  }
}

export function deleteConstruction(constructionId: number) {
  return function (dispatch: any, getState: () => stateType) {
    const moreConstructions = getState().moreConstructions;
    return fetch(`Constructions/DeleteConstruction?constructionId=${constructionId}&skip=${moreConstructions.skip}&take=${moreConstructions.quantity}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => dispatch(setConstructionJSONArr(json)))
  }
}

export function moreConstructions() {
  return function (dispatch: any, getState: () => stateType) {
    const moreConstructions = getState().moreConstructions;
    return fetch(`Constructions/GetConstructions?skip=${moreConstructions.skip}&take=${moreConstructions.quantity + quantityConstructionsStep}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        dispatch(setConstructionJSONArr(json));
        if (json.length >= moreConstructions.quantity)
          setSkipMoreConstructions(moreConstructions.quantity + quantityConstructionsStep);
      })
  }
}

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
