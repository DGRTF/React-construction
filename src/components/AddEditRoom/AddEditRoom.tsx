import React from 'react';
import './AddEditRoom.scss';
import Submit from '../Submit';
import Input from '../Input/Input';
import storeAddEditRoom from '../../store/store/AddEditRoom/AddEditRoom';
import Button from '../Button/Button';

interface IAddEditRoomState {
  visible: boolean;
  roomJSON: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean
  };
}

export default class AddEditRoom extends React.Component<{}, IAddEditRoomState> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      visible: false,
      roomJSON: storeAddEditRoom.getState().roomJSON
    };

    storeAddEditRoom.subscribe(this.SetVisible.bind(this));
  }

  private UpdateCallback: (roomJSONArr: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
}[]) => void;

  private visibleElement: JSX.Element;

  private path: string;

  private headerName: string;

  private submitName: string;

  render() {
    this.visibleElement = this.state.visible ?
      <div className='add-edit-room'>
        <div className='add-edit-room__container'>
          <div className='add-edit-room__header'>
            <span>{this.headerName}</span>
            <div className='add-edit-room__close'>
              <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
            </div>
          </div>
          <form className='add-edit-room__form' onSubmit={this.AddEditConstruction.bind(this)}>
            <input type="hidden" name='roomId' value={this.state.roomJSON ? this.state.roomJSON.id : 0} />
            <input type="hidden" name='constructionId' value={this.state.roomJSON ? this.state.roomJSON.constructionId : 0} />
            <Input text='Введите название' name='name' value={this.state.roomJSON ? this.state.roomJSON.name : ''}></Input>
            <Input text='Введите этаж' name='floor' value={this.state.roomJSON ? `${this.state.roomJSON.floor}` : ''}></Input>
            <Submit name={this.submitName} />
          </form>
        </div>
      </div>
      : null
    return (
      this.visibleElement
    );
  }

  private SetVisible() {
    this.setState({
      visible: storeAddEditRoom.getState().visible,
      roomJSON: storeAddEditRoom.getState().roomJSON,
    });
    this.UpdateCallback = storeAddEditRoom.getState().UpdateCallback;
    this.path = storeAddEditRoom.getState().path;
    this.headerName = storeAddEditRoom.getState().headerName;
    this.submitName = storeAddEditRoom.getState().submitName;
  }

  private Close() {
    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_VISIBLE',
      payload: false
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_ROOM_JSON',
      payload: null
    });
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    const response = await fetch(this.path, {
      method: 'POST',
      body: formData
    });

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_ROOM_JSON',
      payload: null
    });

    let JSONArr = await response.json();

    this.UpdateCallback(JSONArr);

    storeAddEditRoom.dispatch({
      type: 'ADD_EDIT_ROOM_SET_VISIBLE',
      payload: false
    });
  }

}