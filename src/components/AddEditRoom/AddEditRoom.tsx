import React from 'react';
import Submit from '../Submit';
import Input from '../Input/Input';
import './AddEditRoom.scss';

interface IAddEditRoomProps {
  EventGetData: (formData: FormData) => Promise<void>;
  submitText: string;
}

export default class AddEditRoom extends React.Component<IAddEditRoomProps>{
  render() {
    return (
      <form className='add-edit-room' onSubmit={this.GetData.bind(this)}>
        <Input text='Введите название' name='name'></Input>
        <Input text='Введите этаж' name='floor'></Input>
        <Submit name={this.props.submitText} />
      </form>
    );
  }

  private GetData(ev: React.FormEvent) {
    ev.preventDefault();
    let formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.EventGetData(formData);
  }
}