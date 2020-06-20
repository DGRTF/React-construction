import React, { Component } from 'react';
import './Construction.scss';
import FormOneSubmit from './FormOneSubmit';
import Room from './Room';
import Submit from './Submit';
import store from '../store/store';
import Button from './Button/Button';
import AddEditRoom from './AddEditRoom/AddEditRoom';


interface IConstructionProps {
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
  }[];
}

export default class Construction extends Component<IConstructionProps, IConstructionState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visibleButton: true,
      roomJSONArr: [],
      showContent: false,
    }
  }

  private machineInConstructorPath = 'Warehouse/GetMachinesInConstruction?';

  private roomInConstructorPath = 'Warehouse/GetRoomsInConstruction?';

  private machineJSONArr: {
    id: number;
    name: string;
    createYear: number;
  }[];

  private visibleButtonForm: JSX.Element;

  render() {
    this.visibleButtonForm =
      this.state.visibleButton ? <Button name='Добавить комнату' ClickHandler={this.VisibleButtonForm.bind(this)} /> :
        <AddEditRoom EventGetData={this.AddRoom.bind(this)} submitText='Добавить комнату'></AddEditRoom>
    return (
      <div className='construction'>
        <div className='construction__head'>
          <div className='construction__label'>
            <form onSubmit={this.GetRoomsInConstruction.bind(this)}>
              <Submit name='V' />
            </form>
          </div>
          <div className='construction__header'>
            <FormOneSubmit name={this.props.constructionJSON.name}
              EventGetData={this.GetMachineInConstruction.bind(this)}></FormOneSubmit>
          </div>
        </div>
        <div className={'construction__content ' + (this.state.showContent ? '' : 'construction__content-hide')}>
          {this.visibleButtonForm}
          <div className='construction__list'>
            {this.state.roomJSONArr.map(roomJSON =>
            <div className='construction__content-item'>
              <Room roomJSON={roomJSON}></Room>
              <form onSubmit={this.DeleteRoomInConstruction.bind(this)}>
                <input type="hidden" value={`${roomJSON.id}`} name='roomId' />
                <input type="hidden" value={`${this.props.constructionJSON.id}`} name='constructionId' />
                <Submit name='X' />
              </form>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  private async GetRoomsInConstruction(ev: React.FormEvent): Promise<void> {
    ev.preventDefault();
    if (!this.state.showContent) {
      let formData = new FormData(ev.currentTarget as HTMLFormElement);
      const response = await fetch(this.roomInConstructorPath + `constructionId=${this.props.constructionJSON.id}`, {
        method: 'POST',
        body: formData
      });

      let JSONArr = await response.json();
      this.setState({ roomJSONArr: JSONArr });
    }
    this.setState({ showContent: !this.state.showContent });
  }

  private async GetMachineInConstruction(formData: FormData): Promise<void> {
    // const response = await fetch(this.machineInConstructorPath + '/' + this.props.constructorJSON.id, {
    //   method: 'POST',
    //   body: formData
    // });

    // this.machineJSONArr = await response.json();

    // заглушка
    this.machineJSONArr = [
      {
        id: 1,
        name: 'Кладовая',
        createYear: 2,
      },
      {
        id: 2,
        name: 'Офис',
        createYear: 2,
      },
      {
        id: 3,
        name: 'Помещение склада',
        createYear: 2,
      },
    ];

    store.dispatch({
      type: "SET_STATE",
      state: {
        machineJSONArr: this.machineJSONArr
      }
    });
  }

  private async AddRoom(formData: FormData) {
    const response = await fetch(`Warehouse/AddRoomInConstruction?constructionId=${this.props.constructionJSON.id}`, {
      method: 'POST',
      body: formData
    });

    let JSONArr = await response.json();
    this.setState({ roomJSONArr: JSONArr });
    this.setState({ visibleButton: !this.state.visibleButton });
  }

  private VisibleButtonForm() {
    this.setState({ visibleButton: !this.state.visibleButton });
  }

  private async DeleteRoomInConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    let formData = new FormData(ev.currentTarget as HTMLFormElement);
    const response = await fetch('Warehouse/DeleteRoomInConstruction', {
      method: 'POST',
      body: formData
    });

    let JSONArr = await response.json();
    this.setState({ roomJSONArr: JSONArr });
  }

}