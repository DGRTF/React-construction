import React from 'react';
import Hierarchy from './components/Hierarchy';
import { connect } from 'react-redux';
import Table from './components/table/Table';
import { stateType } from './store/store';
import './App.scss';
import Button from './components/Button/Button';
import { bindActionCreators } from 'redux';
import {
  setPathEqualEditPath,
  setMachineTemplate
} from "./store/actions/AddEditMachine/AddEditMachine";
import {
  deleteMachine,
  getMoreMachines
} from './store/actions';

interface IAppProps extends ImapDispatchToProps {
  machineJSONArr?: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }[];
}

interface ImapDispatchToProps {
  setPathEqualEditPath?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
  deleteMachine?: (id: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
  setMachineTemplate?: (machineTemplate: {
    visible?: boolean;
    machineJSON?: {
      id: number;
      name: string;
      createYear: number;
      roomId: number;
    };
    headerName?: string;
    submitName?: string;
  }) => {
    type: "ADD_EDIT_MACHINE_SET_MACHINE_TEMPLATE";
    payload: {
      visible?: boolean;
      machineJSON?: {
        id: number;
        name: string;
        createYear: number;
        roomId: number;
      };
      headerName?: string;
      submitName?: string;
    };
  }
  getMoreMachines?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
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
          <Button name='Ещё' ClickHandler={this.MoreMachines.bind(this)} />
        </div>
      </div>
    );
  }

  private EditMachine() {
    if (this.machineJSON) {
      this.props.setMachineTemplate({
        visible: true,
        machineJSON: this.machineJSON,
        headerName: 'Редактировать оборудование',
        submitName: 'Готово',
      })
      this.props.setPathEqualEditPath();
    }
  }

  private async DeleteMachine() {
    if (this.machineJSON) {
      this.props.deleteMachine(this.machineJSON.id);
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

  private MoreMachines() {
    this.props.getMoreMachines();
  }

}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setPathEqualEditPath,
    deleteMachine,
    setMachineTemplate,
    getMoreMachines
  }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IAppProps, {}>(
  null,
  mapDispatchToProps
)(App);