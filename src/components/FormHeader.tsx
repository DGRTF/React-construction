import React, { Component } from 'react';
import Submit from './Submit';
import './FormHeader.scss';

interface IFormHeaderProps {
  name: string;
  EventGetData: (formData: FormData) => Promise<void>;
}

export default class FormHeader extends Component<IFormHeaderProps> {
  render() {
    return (
      <form className='form-header' onSubmit={this.GetData.bind(this)}>
        <Submit name={this.props.name}/>
      </form>
    );
  }

  private GetData(ev: React.FormEvent) {
    ev.preventDefault();
    let formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.EventGetData(formData);
  }
}