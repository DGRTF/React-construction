import { setMachineArr } from './actions';

type ActionTypes = | ReturnType<typeof setMachineArr>;

export const reducer = function (state: any = {
    machineJSONArr: [{}]
}, action: ActionTypes) {
    switch (action.type) {
        case 'SET_MACHINE_ARR':
            return { ...state, machineJSONArr: action.payload }
        default:
            return state
    }
}

export default reducer;