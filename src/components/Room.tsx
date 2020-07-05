import React, { Component } from 'react';
import './Room.scss';
import Button from './Button/Button';
import { getMachineInRoom } from '../store/actions/Machines/Machines';
import { openAddMachineForm } from '../store/actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { stateType } from '../store/store';
import {
  openEditRoomForm,
} from '../store/actions/actions';
import {
  deleteRoomsInConstruction,
} from '../store/actions/Rooms/Rooms';
import { ActionsPanel } from './ActionsPanel/ActionsPanel';

interface ImapDispatchToProps {
  openEditRoomForm?: (room: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  }) => (dispatch: any, getState: () => stateType) => void;
  getMachineInRoom?: (roomId: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
  openAddMachineForm?: (room: {
    name: string;
    id: number;
  }) => void;
  deleteRoomsInConstruction?: (constructionId: number, roomId: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
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
        <ActionsPanel
          AddItem={this.AddMachineInRoom.bind(this)}
          EditItem={this.EditRoom.bind(this)}
          DeleteItem={this.DeleteRoomInConstruction.bind(this)}
          indicate={this.props.roomJSON.haveMachine}
        />
        <Button name={this.props.roomJSON.name} ClickHandler={this.GetMachineInRoom.bind(this)} />
      </div >
    );
  }

  private EditRoom() {
    this.props.openEditRoomForm(this.props.roomJSON);
  }

  private async DeleteRoomInConstruction() {
    this.props.deleteRoomsInConstruction(this.props.roomJSON.constructionId, this.props.roomJSON.id);
  }

  private async GetMachineInRoom() {
    this.props.getMachineInRoom(this.props.roomJSON.id);
  }

  private AddMachineInRoom() {
    this.props.openAddMachineForm(this.props.roomJSON);
  }

}



function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    getMachineInRoom,
    openAddMachineForm,
    openEditRoomForm,
    deleteRoomsInConstruction,
  }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IRoomProps, {}>(
  null,
  mapDispatchToProps
)(Room);