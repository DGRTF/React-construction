import React from 'react';
import './AddEditMachine.scss';
import Input from '../Input/Input';
import Submit from '../Submit';



interface IAddEditMachineProps {
  EventGetData: (formData: FormData) => Promise<void>;
  submitText: string;
}

export default class AddEditMachine extends React.Component<IAddEditMachineProps> {
  render() {
    return (
      <form className='add-edit-machine' onSubmit={this.GetData.bind(this)}>
        <Input text='Введите название' name='name'></Input>
        <Input text='Введите год изготовления' name='createYear'></Input>
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