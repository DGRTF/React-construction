import React from 'react';
import Hierarchy from './components/Hierarchy';
import { connect } from 'react-redux';
import Table from './components/table/Table';
import store, { stateType } from './store/store';
import './App.scss';
import Button from './components/Button/Button';
import storeAddEditMachine from './store/store/AddEditMachine/AddEditMachine';
import storeUpdate from './store/store/UpdateRoomInConstruction/UpdateRoomInConstruction';
import { getConstructionJSONArr } from "./store/actions/ConstructionJSONArr/ConstructionJSONArr";
import { bindActionCreators } from 'redux';
import {
  setVisible,
  setMachineJSON,
  setHeaderName,
  setSubmitName,
  setPathEqualEditPath,
} from "./store/actions/AddEditMachine/AddEditMachine";
import {deleteMachine}from'./store/actions';

interface IAppProps extends ImapDispatchToProps {
  machineJSONArr?: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }[];
}

interface ImapDispatchToProps {
  getConstructionJSONArr?: () => (dispatch: any) => Promise<any>;
  setMachineJSON?: (machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }) => {
    type: "ADD_EDIT_MACHINE_SET_MACHINE_JSON";
    payload: {
      id: number;
      name: string;
      createYear: number;
      roomId: number;
    };
  }
  setVisible?: (visible: boolean) => {
    type: "ADD_EDIT_MACHINE_SET_VISIBLE";
    payload: boolean;
  }
  setHeaderName?: (headerName: string) => {
    type: "ADD_EDIT_MACHINE_SET_HEADER_NAME";
    payload: string;
  }
  setSubmitName?: (submitName: string) => {
    type: "ADD_EDIT_MACHINE_SET_SUBMIT_NAME";
    payload: string;
  }
  setPathEqualEditPath?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
  deleteMachine?: (id: number)=> (dispatch: any, getState: () => stateType) => Promise<any>;
}

class App extends React.Component<IAppProps> {

  constructor(prop: any) {
    super(prop);
  }

  private machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }

  render() {
    return (
      <div className='app'>
        <Hierarchy />
        <div className='app__table-container'>
          <div className='app__table-edit-delete'>
            <div className='app__edit'>
              <Button name='Редактировать' ClickHandler={this.EditMachine.bind(this)} />
            </div>
            <div className='app__delete'>
              <Button name='Удалить' ClickHandler={this.DeleteMachine.bind(this)} />
            </div>
          </div>
          <Table machineJSONArr={this.props.machineJSONArr} GetMachineJSON={this.SetMachineJSON.bind(this)} />
        </div>
      </div>
    );
  }

  private EditMachine() {
    if (this.machineJSON) {
      this.props.setMachineJSON(this.machineJSON);
      this.props.setPathEqualEditPath();
      this.props.setHeaderName('Редактировать оборудование');
      this.props.setSubmitName('Готово');
      this.props.setVisible(true);
    }
  }

  private async DeleteMachine() {
    if (this.machineJSON) {
      this.props.deleteMachine(this.machineJSON.id);
      this.props.getConstructionJSONArr();

      // storeUpdate.dispatch({
      //   type: 'UPDATE_ROOM_IN_CONSTRUCTION_SET_UPDATE',
      //   payload: true
      // });
    }
  }

  private SetMachineJSON(machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }) {
    this.machineJSON = machineJSON;
  }

}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    getConstructionJSONArr,
    setMachineJSON,
    setVisible,
    setHeaderName,
    setSubmitName,
    setPathEqualEditPath,
    deleteMachine
  }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IAppProps, {}>(
  null,
  mapDispatchToProps
)(App);