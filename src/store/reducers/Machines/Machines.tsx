import { setMachineArr } from '../../actions/Machines/Machines';

type ActionTypes = ReturnType<typeof setMachineArr>;

export const reducer = function (state: {
    machineJSONArr: {
        id: number;
        name: string;
        createYear: number;
        roomId: number;
    }[]
} = {
        machineJSONArr: null
    }, action: ActionTypes) {
    switch (action.type) {
        case 'SET_MACHINE_ARR':
            return { ...state, machineJSONArr: action.payload }
        default:
            return state
    }
}

export default reducer;