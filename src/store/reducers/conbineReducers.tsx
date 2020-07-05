import {combineReducers} from 'redux';
import addEditConstruction from './AddEditConstruction/AddEditConstruction';
import addEditMachine from './AddEditMachine/AddEditMachine';
import addEditRoom from './AddEditRoom/AddEditRoom';
import constructionJSONArr from './ConstructionJSONArr/ConstructionJSONArr';
import machineJSONArr from '../reducer';
import roomReducer from './Rooms/Rooms'
import moreMachines from './MoreMachines/MoreMachines';
import moreRooms from './MoreRooms/MoreRooms';

const appReducers = combineReducers({
  addEditConstruction,
  addEditMachine,
  addEditRoom,
  constructionJSONArr,
  machineJSONArr,
  roomReducer,
  moreMachines,
  moreRooms,
});

export default appReducers;