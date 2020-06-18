import React, { Component } from 'react';
import './Submit.scss';

interface ISubmitProps {
  name: string;
}

export default class Submit extends Component<ISubmitProps> {
  render() {
    return (
      <input className='submit' type='submit' value={this.props.name} />
    );
  }
}