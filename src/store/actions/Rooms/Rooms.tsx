import { stateType } from '../../store'
import {
  deleteElementSkipTakeMoreRooms,
  addSkipQuantityMoreRooms,
  editSkipTake
} from '../MoreRooms/MoreRooms';
import {
  setRoomJSON,
  setVisibleAddEditRoomForm
} from '../AddEditRoom/AddEditRoom';

export function setRooms(rooms: {
  id: number;
  name: string;
  floor: number;
  constructionId: number;
  haveMachine: boolean
}[]) {
  return {
    type: GetLiteralInString('ROOMS_SET_ROOMS'),
    payload: rooms
  }
}

export function addRooms(rooms: {
  id: number;
  name: string;
  floor: number;
  constructionId: number;
  haveMachine: boolean
}[]) {
  return {
    type: GetLiteralInString('ROOMS_ADD_ROOMS'),
    payload: rooms
  }
}

export function removeRoomsInStore(constructionId: number) {
  return function (dispatch: any, getState: () => stateType) {
    const state = getState().roomReducer.rooms.slice();
    let reserveState = state.slice();
    state.forEach((el) => {
      if (el.constructionId === constructionId) {
        const index = reserveState.indexOf(el);
        if (index > -1)
          reserveState.splice(index, 1);
      }
    })
    dispatch(setRooms(reserveState));
  }
}

export function getRoomsInConstruction(constructionId: number) {
  return function (dispatch: any, getState: () => stateType) {
    return fetch(`Rooms/GetRoomsInConstruction?constructionId=${constructionId}&skip=${skipRooms}&take=${takeRooms}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        const state = getState().roomReducer.rooms.slice();
        let reserveState = state.slice();
        state.forEach(el => {
          if (el.constructionId === constructionId) {
            const index = reserveState.indexOf(el);
            if (index > -1)
              reserveState.splice(index, 1);
          }
        })
        dispatch(setRooms(reserveState));
        dispatch(addRooms(json));

        deleteElementSkipTakeMoreRooms(constructionId)(dispatch, getState);
        dispatch(addSkipQuantityMoreRooms(constructionId));
      })
  }
}

export function deleteRoomsInConstruction(constructionId: number, roomId: number) {
  return function (dispatch: any, getState: () => stateType) {
    const skipTake = findSkipTakeByConstructionId(constructionId, getState);
    return fetch(
      `Rooms/DeleteRoomInConstruction?constructionId=${constructionId}&roomId=${roomId}&skip=${skipTake.skip}&take=${skipTake.quantity}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        const state = getState().roomReducer.rooms.slice();
        let reserveState = state.slice();
        state.forEach((el) => {
          if (el.constructionId === constructionId) {
            const index = reserveState.indexOf(el);
            if (index > -1)
              reserveState.splice(index, 1);
          }
        })
        dispatch(setRooms(reserveState));
        dispatch(addRooms(json));
      })
  }
}

export function addEditRoomInConstruction(formData: FormData) {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setRoomJSON(null));
    dispatch(setVisibleAddEditRoomForm(false));
    const constructionId: number = Number(formData.get('constructionId'));
    const skipTake = findSkipTakeByConstructionId(constructionId, getState);
    return fetch(`${getState().addEditRoom.path}?skip=${skipTake.skip}&take=${skipTake.quantity}`, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(json => {
        const state = getState().roomReducer.rooms.slice();
        let reserveState = state.slice();
        state.forEach((el) => {
          if (el.constructionId === constructionId) {
            const index = reserveState.indexOf(el);
            if (index > -1)
              reserveState.splice(index, 1);
          }
        })
        dispatch(setRooms(reserveState));
        dispatch(addRooms(json))
      })
  }
}

// Эта функция обновляет комнаты здания, в котором были изменения оборудования
export function getRoomsInConstructionWithCurrentMachine(roomId: number) {
  return function (dispatch: any, getState: () => stateType) {
    let constructionId: number;
    const rooms = getState().roomReducer.rooms.slice();
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === roomId) {
        constructionId = rooms[i].constructionId;
        break;
      }
    }
    const skipTake = findSkipTakeByConstructionId(constructionId, getState);
    return fetch(
      `Rooms/GetRoomsInConstruction?constructionId=${constructionId}&skip=${skipTake.skip}&take=${skipTake.quantity}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        let reserveRooms = rooms.slice();
        rooms.forEach(el => {
          if (el.constructionId === constructionId) {
            const index = reserveRooms.indexOf(el);
            if (index > -1)
              reserveRooms.splice(index, 1);
          }
        })
        dispatch(setRooms(reserveRooms));
        dispatch(addRooms(json));
      })
  }
}

const skipRooms = 0;
const takeRooms = 10;
const takeRoomsStep = 10;

export function getMoreRooms(constructionId: number) {
  return function (dispatch: any, getState: () => stateType) {
    const skipTake = findSkipTakeByConstructionId(constructionId, getState);
    return fetch(
      `Rooms/GetRoomsInConstruction?constructionId=${constructionId}&skip=${skipTake.skip}&take=${skipTake.quantity + takeRoomsStep}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        const state = getState().roomReducer.rooms.slice();
        let reserveState = state.slice();
        state.forEach(el => {
          if (el.constructionId === constructionId) {
            const index = reserveState.indexOf(el);
            if (index > -1)
              reserveState.splice(index, 1);
          }
        })
        dispatch(setRooms(reserveState));
        dispatch(addRooms(json));
        const changeQuantity = skipTake.quantity + takeRoomsStep;
        console.warn('object');
        if (json.length >= skipTake.quantity)
          editSkipTake({
            skip: skipRooms,
            quantity: changeQuantity,
            constructionId
          })(dispatch);
      })
      .catch(error => alert('Что-то пошло не так :('));
  }
}

export function findSkipTakeByConstructionId(constructionId: number, getState: () => stateType) {
  const moreRooms = getState().moreRooms;
  let skipTate: {
    skip: number;
    quantity: number;
  };
  for (let i = 0; i < moreRooms.skipQuantityConstriction.length; i++) {
    if (moreRooms.skipQuantityConstriction[i].constructionId === constructionId) {
      skipTate = moreRooms.skipQuantityConstriction[i];
      break;
    }
  }
  return skipTate ? skipTate : {
    skip: skipRooms,
    quantity: takeRooms,
  };
}




function GetLiteralInString<T extends string>(str: T): T {
  return str;
}