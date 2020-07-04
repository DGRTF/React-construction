import React, { Component } from 'react';
import './Construction.scss';
import FormOneSubmit from './FormOneSubmit';
import Room from './Room';
import Submit from './Submit';
import Button from './Button/Button';
import { getMachineInConstruction } from '../store/actions';
import {
  getRoomsInConstruction,
  removeRoomsInStore,
  deleteRoomsInConstruction
} from '../store/actions/Rooms/Rooms';
import Indicate from './Indicate/Indicate';
import {
  setEditDeletePathsInConstruction
} from "../store/actions/AddEditMachine/AddEditMachine";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAddEditRoomTemplate } from "../store/actions/AddEditRoom/AddEditRoom";
import { stateType } from '../store/store';

interface ImapStateToProps {
  rooms?: {
    id: number
    name: string
    floor: number
    constructionId: number
    haveMachine: boolean
  }[]

}

interface ImapDispatchToProps {
  setEditDeletePathsInConstruction?: (constructionId: number) => {
    type: "ADD_EDIT_MACHINE_SET_EDIT_DELETE_PATHS";
    payload: {
      editPath: string;
      deletePath: string;
    };
  }
  getMachineInConstruction?: (constructionId: number) => (dispatch: any) => Promise<any>;
  setPath?: (path: string) => {
    type: "ADD_EDIT_ROOM_SET_PATH";
    payload: string;
  }
  setAddEditRoomTemplate?: (roomTemplate: {
    visible: boolean;
    roomJSON: {
      id: number;
      name: string;
      floor: number;
      constructionId: number;
      haveMachine: boolean;
    };
    path: string;
    headerName: string;
    submitName: string;
  }) => {
    type: "ADD_EDIT_ROOM_SET_ROOM_TEMPLATE";
    payload: {
      visible: boolean;
      roomJSON: {
        id: number;
        name: string;
        floor: number;
        constructionId: number;
        haveMachine: boolean;
      };
      path: string;
      headerName: string;
      submitName: string;
    }
  }
  deleteRoomsInConstruction?: (constructionId: number, formData: FormData) => (dispatch: any, getState: () => stateType) => Promise<any>;
  getRoomsInConstruction?: (constructionId: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
  removeRoomsInStore?: (constructionId: number) => (dispatch: any, getState: () => stateType) => void;
}

interface IConstructionProps extends ImapDispatchToProps, ImapStateToProps {
  constructionJSON: {
    id: number
    name: string
    address: string
    haveMachine: boolean
  };
}

interface IConstructionState {
  showContent: boolean;
}

class Construction extends Component<IConstructionProps, IConstructionState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showContent: false,
    }
  }

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
            {this.props.rooms && this.props.rooms.map((room, item) => {
              return (room.constructionId === this.props.constructionJSON.id ?
                <div key={room.id} className='construction__content-item'>
                  <div className='construction__edit-room'>
                    <Button dataSetRoom={`${item}`} name='/' ClickHandler={this.EditRoom.bind(this)}></Button>
                  </div>
                  <div className='construction__delete-room'>
                    <form onSubmit={this.DeleteRoomInConstruction.bind(this)}>
                      <input type="hidden" value={`${room.id}`} name='roomId' />
                      <Submit name='X' />
                    </form>
                  </div>
                  <Indicate indicate={room.haveMachine} />
                  <Room roomJSON={room}></Room>
                </div>
                : null)
            }
            )}
          </div>
        </div>
      </div>
    );
  }

  private GetRoomsInConstruction() {
    if (!this.state.showContent)
      this.props.getRoomsInConstruction(this.props.constructionJSON.id);
    else
      this.props.removeRoomsInStore(this.props.constructionJSON.id);
    this.setState({ showContent: !this.state.showContent });
  }

  private AddRoomInConstruction() {
    this.props.setAddEditRoomTemplate({
      visible: true,
      path: 'Rooms/AddRoomInConstruction',
      headerName: `Добавить комнату в здание "${this.props.constructionJSON.name}"`,
      submitName: 'Добавить комнату',
      roomJSON: {
        id: 0,
        name: '',
        floor: null,
        haveMachine: false,
        constructionId: this.props.constructionJSON.id,
      },
    });
  }

  private EditRoom(ev: React.MouseEvent) {
    const item = (ev.currentTarget as HTMLElement).dataset.roomItem;
    this.props.setAddEditRoomTemplate({
      visible: true,
      path: 'Rooms/EditRoomInConstruction',
      headerName: `Редактировать комнату в здании "${this.props.constructionJSON.name}"`,
      submitName: 'Изменить',
      roomJSON: this.props.rooms[Number(item)],
    });
  }

  private async DeleteRoomInConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.deleteRoomsInConstruction(this.props.constructionJSON.id, formData);
  }

  private async GetMachineInConstruction(): Promise<void> {
    this.props.getMachineInConstruction(this.props.constructionJSON.id);
    this.props.setEditDeletePathsInConstruction(this.props.constructionJSON.id);
  }

}



function mapStateToProps(state: stateType) {
  return {
    rooms: state.roomReducer.rooms
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setEditDeletePathsInConstruction,
    getMachineInConstruction,
    setAddEditRoomTemplate,
    getRoomsInConstruction,
    deleteRoomsInConstruction,
    removeRoomsInStore,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IConstructionProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(Construction);