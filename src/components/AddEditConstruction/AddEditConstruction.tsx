import React from 'react';
import Submit from '../Submit';
import Input from '../Input/Input';
import './AddEditConstruction.scss';

interface IAddEditConstructionProps {
  EventGetData: (formData: FormData) => Promise<void>;
}

export default class AddEditConstruction extends React.Component<IAddEditConstructionProps>{
  render() {
    return (
      <form className='add-edit-construction' onSubmit={this.GetData.bind(this)}>
        <Input text='Введите название' name='name'></Input>
        <Input text='Введите адрес' name='address'></Input>
        <Submit name='Добавить здание' />
      </form>
    );
  }

  private GetData(ev: React.FormEvent) {
    ev.preventDefault();
    let formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.EventGetData(formData);
  }
}