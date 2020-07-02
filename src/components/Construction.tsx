import React, { Component } from 'react';
import './Construction.scss';
import FormOneSubmit from './FormOneSubmit';
import Room from './Room';
import Submit from './Submit';
import store from '../store/store';
import Button from './Button/Button';
import storeAddEditRoom from '../store/store/AddEditRoom/AddEditRoom';
import { getMachineInConstruction } from '../store/actions';
import storeUpdate from '../store/store/UpdateRoomInConstruction/UpdateRoomInConstruction';
import storeConstructionIdUpdate from '../store/store/UpdateRoomInConstruction/ConstructionId';
import Indicate from './Indicate/Indicate';
import {
  setAddPathInConstruction,
  setEditPathInConstruction,
  setDeletePathInConstruction
} from "../store/actions/AddEditMachine/AddEditMachine";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { stateType } from '../store/store';

interface ImapDispatchToProps {
  setAddPathInConstruction?: (id: number) => {
    type: "ADD_EDIT_MACHINE_SET_ADD_PATH";
    payload: string;
  }
  setEditPathInConstruction?: (id: number) => {
    type: "ADD_EDIT_MACHINE_SET_EDIT_PATH";
    payload: string;
  }
  setDeletePathInConstruction?: (id: number) => {
    type: "ADD_EDIT_MACHINE_SET_DELETE_PATH";
    payload: string;
  }
  getMachineInConstruction?:(constructionId: number)=> (dispatch: any) => Promise<any>
}

interface IConstructionProps extends ImapDispatchToProps {
  constructionJSON: {
    id: number;
    name: string;
    address: string;
  };
}

interface IConstructionState {
  showContent: boolean;
  visibleButton: boolean;
  roomJSONArr: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  }[];
}

class Construction extends Component<IConstructionProps, IConstructionState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visibleButton: true,
      roomJSONArr: [],
      showContent: false,
    }

    storeUpdate.subscribe(this.UpdateRoomInConstruction.bind(this));
  }

  private roomInConstructorPath = 'Rooms/GetRoomsInConstruction?';

  // private editMachineInConstructionPath = `Machines/EditMachinesInConstruction?constructionId=${this.props.constructionJSON.id}`;

  private machineJSONArr: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
    constructionId: number;
    haveMachine: boolean
  }[];

  render() {
    return (
      <div className='construction'>
        <div className='construction__head'>
          <div className='construction__label'>
            <Button ClickHandler={this.GetRoomsInConstruction.bind(this)} name='V' />
          </div>
          <div className='construction__header'>
            <div className='construction__add-room'>
              <Button name='+' ClickHandler={this.AddRoomInConstruction.bind(this)} />
            </div>
            <FormOneSubmit name={this.props.constructionJSON.name}
              EventGetData={this.GetMachineInConstruction.bind(this)}></FormOneSubmit>
          </div>
        </div>
        <div className={'construction__content ' + (this.state.showContent ? '' : 'construction__content-hide')}>
          <div className='construction__list'>
            {this.state.roomJSONArr.map((roomJSON, item) =>
              <div className='construction__content-item'>
                <div className='construction__edit-room'>
                  <Button dataSetRoom={`${item}`} name='/' ClickHandler={this.EditRoom.bind(this)}></Button>
                </div>
                <div className='construction__delete-room'>
                  <form onSubmit={this.DeleteRoomInConstruction.bind(this)}>
                    <input type="hidden" value={`${roomJSON.id}`} name='roomId' />
                    <input type="hidden" value={`${this.props.constructionJSON.id}`} name='constructionId' />
                    <Submit name='X' />
                  </form>
                </div>
                <Indicate indicate={roomJSON.haveMachine} />
                <Room roomJSON={roomJSON}></Room>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  private EditRoom(ev: React.MouseEvent) {
    const item = (ev.currentTarget as HTMLElement).dataset.roomItem;

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_HEADER_NAME',
      payload: `Редактировать комнату в здании "${this.props.constructionJSON.name}"`
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_SUBMIT_NAME',
      payload: `Изменить`
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_ROOM_JSON',
      payload: this.state.roomJSONArr[Number(item)]
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_CALLBACK',
      payload: this.SetRoomJSONArr.bind(this)
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_VISIBLE',
      payload: true
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_PATH',
      payload: 'Rooms/EditRoomInConstruction'
    });
  }

  private async GetRoomsInConstruction(ev: React.FormEvent): Promise<void> {
    if (!this.state.showContent) {
      this.GetRooms();
    }
    this.setState({ showContent: !this.state.showContent });
  }

  private async GetRooms() {
    const response = await fetch(this.roomInConstructorPath + `constructionId=${this.props.constructionJSON.id}`, {
      method: 'POST',
    });

    let JSONArr = await response.json();
    this.setState({ roomJSONArr: JSONArr });
  }

  private async GetMachineInConstruction(formData: FormData): Promise<void> {
    this.props.getMachineInConstruction(this.props.constructionJSON.id);
    this.props.setEditPathInConstruction(this.props.constructionJSON.id);
    this.props.setDeletePathInConstruction(this.props.constructionJSON.id);
  }

  private UpdateRoomInConstruction() {
    const constructionId = storeConstructionIdUpdate.getState().constructionId;
    if (constructionId === this.props.constructionJSON.id) {
      this.GetRooms();
    }
  }

  private AddRoomInConstruction() {
    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_HEADER_NAME',
      payload: `Добавить комнату в здание "${this.props.constructionJSON.name}"`
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_SUBMIT_NAME',
      payload: `Добавить комнату`
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_ROOM_JSON',
      payload: {
        id: 0,
        name: '',
        floor: null,
        haveMachine: false,
        constructionId: this.props.constructionJSON.id,
      }
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_CALLBACK',
      payload: this.SetRoomJSONArr.bind(this)
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_VISIBLE',
      payload: true
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_PATH',
      payload: 'Rooms/AddRoomInConstruction'
    });
  }

  private SetRoomJSONArr(JSONArr: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  }[]) {
    this.setState({ roomJSONArr: JSONArr });
  }

  private async DeleteRoomInConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    let formData = new FormData(ev.currentTarget as HTMLFormElement);
    const response = await fetch('Rooms/DeleteRoomInConstruction', {
      method: 'POST',
      body: formData
    });

    let JSONArr = await response.json();
    this.setState({ roomJSONArr: JSONArr });
  }

}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setAddPathInConstruction: setAddPathInConstruction,
    setEditPathInConstruction: setEditPathInConstruction,
    setDeletePathInConstruction: setDeletePathInConstruction,
    getMachineInConstruction: getMachineInConstruction,
  }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IConstructionProps, {}>(
  null,
  mapDispatchToProps
)(Construction);