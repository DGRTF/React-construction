import React, { Component } from 'react';
import './Construction.scss';
import FormHeader from './FormHeader';
import Room from './Room';
import Submit from './Submit';
import store from '../store/store';


interface IConstructionProps {
  constructorJSON: {
    id: number;
    name: string;
    address: string;
  };
}

interface IConstructionState {
  roomList?: JSX.Element;
  showContent: boolean;
}

export default class Construction extends Component<IConstructionProps, IConstructionState> {
  private roomJSONArr: {
    id: number;
    name: string;
    floor: number;
  }[] = [];

  constructor(props: any) {
    super(props);
    this.roomJSONArr = [
      {
        id: 1,
        name: 'Кладовая',
        floor: 2,
      },
    ];
    this.state = {
      roomList:
        <div className='construction__list'>
          {this.roomJSONArr.map(room =>
            <Room roomJSON={room}></Room>
          )}
        </div>,
      showContent: false,
    }
  }

  private machineInConstructorPath = 'Warehouse/GetRoomsInConstructor?';

  private roomInConstructorPath = 'Warehouse/GetMachineInConstructor?';

  private machineJSONArr: {
    id: number;
    name: string;
    createYear: number;
  }[];

  render() {
    return (
      <div className='construction'>
        <div className='construction__head'>
          <div className='construction__label'>
            <form onSubmit={this.GetRoomsInConstructor.bind(this)}>
              <Submit name='V' />
            </form>
          </div>
          <div className='construction__header'>
            <FormHeader name={this.props.constructorJSON.name}
              EventGetData={this.GetMachineInConstructor.bind(this)}></FormHeader>
          </div>
        </div>
        <div className={'construction__content ' + (this.state.showContent ? '' : 'construction__content-hide')}>
          {this.state.roomList && <div>{this.state.roomList}</div>}
        </div>
      </div>
    );
  }

  private async GetRoomsInConstructor(ev: React.FormEvent): Promise<void> {
    ev.preventDefault();
    if (!this.state.showContent) {
      // let formData = new FormData(ev.currentTarget as HTMLFormElement);
      // const response = await fetch(this.roomInConstructorPath + this.props.constructorJSON.id, {
      //   method: 'POST',
      //   body: formData
      // });

      // this.roomJSONArr = await response.json();

      //Заглушка
      this.roomJSONArr = [
        {
          id: 1,
          name: 'Кладовая',
          floor: 2,
        },
        {
          id: 2,
          name: 'Офис',
          floor: 2,
        },
        {
          id: 3,
          name: 'Помещение склада',
          floor: 2,
        },
      ];
      this.UpdateContent();
    }
    this.setState({ showContent: !this.state.showContent });
  }

  private UpdateContent() {
    const roomList: JSX.Element =
      <div className='constructor__list'>
        {this.roomJSONArr.map(room =>
          <Room roomJSON={room}></Room>
        )}
      </div>;
    this.setState({
      roomList: roomList
    });
  }

  private async GetMachineInConstructor(formData: FormData): Promise<void> {
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

}