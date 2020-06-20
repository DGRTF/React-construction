import React, { Component } from 'react';
import Submit from './Submit';
import './FormOneSubmit.scss';

interface IFormOneSubmitProps {
  name: string;
  EventGetData: (formData: FormData) => Promise<void>;
}

export default class FormOneSubmit extends Component<IFormOneSubmitProps> {
  render() {
    return (
      <form className='form-one-submit' onSubmit={this.GetData.bind(this)}>
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