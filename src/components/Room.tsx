import React, { Component } from 'react';
import './Room.scss';
import FormOneSubmit from './FormOneSubmit';
import Button from './Button/Button';
import { getMachineInRoom } from '../store/actions';
import {
  setAddPathInRoom,
  setEditPathInRoom,
  setDeletePathInRoom,
  setVisible,
  setMachineJSON,
  setHeaderName,
  setSubmitName,
  setPathEqualAddPath,
} from "../store/actions/AddEditMachine/AddEditMachine";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { stateType } from '../store/store';

interface ImapDispatchToProps {
  setAddPathInRoom?: (id: number) => {
    type: "ADD_EDIT_MACHINE_SET_ADD_PATH";
    payload: string;
  }
  setEditPathInRoom?: (id: number) => {
    type: "ADD_EDIT_MACHINE_SET_EDIT_PATH";
    payload: string;
  }
  setDeletePathInRoom?: (id: number) => {
    type: "ADD_EDIT_MACHINE_SET_DELETE_PATH";
    payload: string;
  }
  getMachineInRoom?: (roomId: number) => (dispatch: any) => Promise<any>;
  setVisible?: (visible: boolean) => {
    type: "ADD_EDIT_MACHINE_SET_VISIBLE";
    payload: boolean;
  }
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
  setHeaderName?: (headerName: string) => {
    type: "ADD_EDIT_MACHINE_SET_HEADER_NAME";
    payload: string;
  }
  setSubmitName?: (submitName: string) => {
    type: "ADD_EDIT_MACHINE_SET_SUBMIT_NAME";
    payload: string;
  }
  setPathEqualAddPath?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
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
        <div className='room__label'></div>
        <div className='room__add-machine'>
          <Button name='+' ClickHandler={this.AddMachineInRoom.bind(this)} />
        </div>
        <FormOneSubmit name={this.props.roomJSON.name} EventGetData={this.GetMachineInRoom.bind(this)}></FormOneSubmit>
      </div >
    );
  }

  private async GetMachineInRoom(formData: FormData): Promise<void> {
    this.props.getMachineInRoom(this.props.roomJSON.id);
    this.props.setAddPathInRoom(this.props.roomJSON.id);
    this.props.setEditPathInRoom(this.props.roomJSON.id);
    this.props.setDeletePathInRoom(this.props.roomJSON.id);

    // storeConstructionIdUpdate.dispatch({
    //   type: 'UPDATE_ROOM_IN_CONSTRUCTION_SET_CONSTRUCTION_ID',
    //   payload: this.props.roomJSON.constructionId
    // });
  }

  private AddMachineInRoom() {
    this.props.setVisible(true);
    this.props.setMachineJSON(null)
    this.props.setHeaderName(`Добавить оборудование в комнату "${this.props.roomJSON.name}"`);
    this.props.setSubmitName('Добавить оборудование');
    this.props.setAddPathInRoom(this.props.roomJSON.id);
    this.props.setPathEqualAddPath();
    this.props.setDeletePathInRoom(this.props.roomJSON.id);
  }

}



function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setAddPathInRoom,
    setEditPathInRoom,
    setDeletePathInRoom,
    getMachineInRoom,
    setVisible,
    setMachineJSON,
    setHeaderName,
    setSubmitName,
    setPathEqualAddPath,
  }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IRoomProps, {}>(
  null,
  mapDispatchToProps
)(Room);