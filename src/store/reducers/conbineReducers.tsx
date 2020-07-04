import {combineReducers} from 'redux';
import addEditConstruction from './AddEditConstruction/AddEditConstruction';
import addEditMachine from './AddEditMachine/AddEditMachine';
import addEditRoom from './AddEditRoom/AddEditRoom';
import constructionJSONArr from './ConstructionJSONArr/ConstructionJSONArr';
import updateRoomInConstruction from './UpdateRoomInConstruction/UpdateRoomInConstruction';
import deleteMachinePath from './DeleteMachinePath/DeleteMachinePath';
import machineJSONArr from '../reducer';
import roomReducer from './Rooms/Rooms'

const appReducers = combineReducers({
  addEditConstruction,
  addEditMachine,
  addEditRoom,
  constructionJSONArr,
  updateRoomInConstruction,
  machineJSONArr,
  deleteMachinePath,
  roomReducer
});

export default appReducers;