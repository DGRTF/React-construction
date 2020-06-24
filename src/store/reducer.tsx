import { addMachine, setState, deleteMachine, setMachineArr } from './actions';

type ActionTypes = ReturnType<typeof addMachine> | ReturnType<typeof setState> | ReturnType<typeof deleteMachine>
| ReturnType<typeof setMachineArr> ;

export let reducer = function (state: any, action: ActionTypes) {
    switch (action.type) {
        case "SET_STATE":
            return state = action.state;
        case "ADD_MACHINE":
            return state.machineJSONArr.push(action.machineJSON);
        case "DELETE_MACHINE":
            return (state.machineJSONArr as Array<any>).filter(
                (element) => element !== action.machineJSON
            );
        case 'SET_MACHINEARR':
            return state.machineJSONArr = action.machineJSONArr;
    }
}