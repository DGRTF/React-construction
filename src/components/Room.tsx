import React, { Component } from 'react';
import './Room.scss';
import Button from './Button/Button';
import { getMachineInRoom } from '../store/actions';
import {
  setPathEqualAddPath,
  setMachineTemplate,
  setAddEditDeletePathsInRoom,
} from "../store/actions/AddEditMachine/AddEditMachine";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { stateType } from '../store/store';
import { setGetMachineInRoomPathMoreMachines } from '../store/actions/MoreMachines/MoreMachines';

interface ImapDispatchToProps {
  setAddEditDeletePathsInRoom?: (roomId: number) => {
    type: "ADD_EDIT_MACHINE_SET_ADD_EDIT_DELETE-PATHS";
    payload: {
      addPath: string;
      editPath: string;
      deletePath: string;
    };
  }
  getMachineInRoom?: (roomId: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
  setPathEqualAddPath?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
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
  setGetMachineInRoomPathMoreMachines?: (roomId: number) => {
    type: "MORE_MACHINE_SET_PATH";
    payload: string;
  }
}

interface IRoomProps extends ImapDispatchToProps {
  roomJSON: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  };
}

class Room extends Component<IRoomProps> {
  constructor(prop: any) {
    super(prop);
  }
  render() {
    return (
      <div className='room'>
        <div className='room__add-machine'>
          <Button name='+' ClickHandler={this.AddMachineInRoom.bind(this)} />
        </div>
        <Button name={this.props.roomJSON.name} ClickHandler={this.GetMachineInRoom.bind(this)} />
      </div >
    );
  }

  private async GetMachineInRoom() {
    this.props.getMachineInRoom(this.props.roomJSON.id);
    this.props.setAddEditDeletePathsInRoom(this.props.roomJSON.id);
  }

  private AddMachineInRoom() {
    this.props.setMachineTemplate({
      visible: true,
      machineJSON: {
        id: null,
        name: '',
        createYear: null,
        roomId: this.props.roomJSON.id,
      },
      headerName: `Добавить оборудование в комнату "${this.props.roomJSON.name}"`,
      submitName: 'Добавить оборудование',
    })
    this.props.setAddEditDeletePathsInRoom(this.props.roomJSON.id);
    this.props.setPathEqualAddPath();
    this.props.setGetMachineInRoomPathMoreMachines(this.props.roomJSON.id);
  }

}



function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    getMachineInRoom,
    setPathEqualAddPath,
    setMachineTemplate,
    setAddEditDeletePathsInRoom,
    setGetMachineInRoomPathMoreMachines,
  }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IRoomProps, {}>(
  null,
  mapDispatchToProps
)(Room);