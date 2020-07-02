import {combineReducers} from 'redux';
import addEditConstruction from './AddEditConstruction/AddEditConstruction';
import addEditMachine from './AddEditMachine/AddEditMachine';
import addEditRoom from './AddEditRoom/AddEditRoom';
import constructionJSONArr from './ConstructionJSONArr/ConstructionJSONArr';
import updateRoomInConstruction from './UpdateRoomInConstruction/UpdateRoomInConstruction';
import deleteMachinePath from './DeleteMachinePath/DeleteMachinePath';
import machineJSONArr from '../reducer';

const appReducers = combineReducers({
  addEditConstruction,
  addEditMachine,
  addEditRoom,
  constructionJSONArr,
  updateRoomInConstruction,
  machineJSONArr,
  deleteMachinePath
});

export default appReducers;