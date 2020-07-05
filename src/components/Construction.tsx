import React, { Component } from 'react';
import './Construction.scss';
import Room from './Room';
import Button from './Button/Button';
import { getMachineInConstruction } from '../store/actions/Machines/Machines';
import {
  openAddRoomForm,
} from '../store/actions/actions';
import {
  getRoomsInConstruction,
  removeRoomsInStore,
  getMoreRooms,
} from '../store/actions/Rooms/Rooms';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { stateType } from '../store/store';
import { ActionsPanel } from './ActionsPanel/ActionsPanel';
import {
  openEditConstructionForm
} from '../store/actions/actions';
import {
  deleteConstruction,
} from "../store/actions/ConstructionJSONArr/ConstructionJSONArr";

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
  getMachineInConstruction?: (constructionId: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
  getRoomsInConstruction?: (constructionId: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
  removeRoomsInStore?: (constructionId: number) => (dispatch: any, getState: () => stateType) => void;
  getMoreRooms?: (constructionId: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
  openAddRoomForm?: (construction: {
    id: number;
    name: string;
  }) => (dispatch: any, getState: () => stateType) => void;
  openEditConstructionForm?: (construction: {
    id: number;
    name: string;
    address: string;
    haveMachine: boolean;
  }) => (dispatch: any, getState: () => stateType) => void;
  deleteConstruction?: (constructionId: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
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
          <ActionsPanel
            AddItem={this.AddRoomInConstruction.bind(this)}
            EditItem={this.EditConstruction.bind(this)}
            DeleteItem={this.DeleteConstruction.bind(this)}
            indicate={this.props.constructionJSON.haveMachine}
          />
          <Button ClickHandler={this.GetRoomsInConstruction.bind(this)} name='V' />
          <Button name={this.props.constructionJSON.name}
            ClickHandler={this.GetMachineInConstruction.bind(this)}
          />
        </div>
        <div className={'construction__content ' + (this.state.showContent ? '' : 'construction__content-hide')}>
          <div className='construction__list'>
            {this.props.rooms && this.props.rooms.map((room, item) => {
              return (room.constructionId === this.props.constructionJSON.id ?
                <div key={room.id} className='construction__content-item'>
                  <Room roomJSON={room}></Room>
                </div>
                : null
              )
            }
            )}
            <Button name='Ещё' ClickHandler={this.MoreRooms.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

  private EditConstruction() {
    this.props.openEditConstructionForm(this.props.constructionJSON);
  }

  private async DeleteConstruction() {
    this.props.deleteConstruction(this.props.constructionJSON.id);
  }

  private GetRoomsInConstruction() {
    if (!this.state.showContent)
      this.props.getRoomsInConstruction(this.props.constructionJSON.id);
    else
      this.props.removeRoomsInStore(this.props.constructionJSON.id);
    this.setState({ showContent: !this.state.showContent });
  }

  private AddRoomInConstruction() {
    this.props.openAddRoomForm(this.props.constructionJSON);
  }

  private MoreRooms() {
    this.props.getMoreRooms(this.props.constructionJSON.id);
  }

  private async GetMachineInConstruction() {
    this.props.getMachineInConstruction(this.props.constructionJSON.id);
  }

}



function mapStateToProps(state: stateType) {
  return {
    rooms: state.roomReducer.rooms
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    getMachineInConstruction,
    getRoomsInConstruction,
    removeRoomsInStore,
    getMoreRooms,
    openAddRoomForm,
    deleteConstruction,
    openEditConstructionForm,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IConstructionProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(Construction);