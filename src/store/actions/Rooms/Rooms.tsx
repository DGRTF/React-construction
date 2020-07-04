import { stateType } from '../../store'

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
    return fetch(`Rooms/GetRoomsInConstruction?constructionId=${constructionId}`, {
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
      })
  }
}

export function deleteRoomsInConstruction(constructionId: number, formData: FormData) {
  return function (dispatch: any, getState: () => stateType) {
    return fetch(`Rooms/DeleteRoomInConstruction?constructionId=${constructionId}`, {
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
        dispatch(addRooms(json));
      })
  }
}

export function addEditRoomInConstruction(formData: FormData) {
  return function (dispatch: any, getState: () => stateType) {
    return fetch(getState().addEditRoom.path, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(json => {
        const state = getState().roomReducer.rooms.slice();
        let reserveState = state.slice();
        const constructionId: number = Number(formData.get('constructionId'));
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
    return fetch(`Rooms/GetRoomsInConstruction?constructionId=${constructionId}`, {
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



function GetLiteralInString<T extends string>(str: T): T {
  return str;
}