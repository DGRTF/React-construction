import React, { Component } from 'react';
import './Button.scss';

interface ISubmitProps {
  name: string;
  ClickHandler?: (ev: React.MouseEvent) => void;
  dataSet?: string;
}

export default class Submit extends Component<ISubmitProps> {
  render() {
    return (
      <button className='button-default'  data-construction-item={this.props.dataSet} onClick={this.props.ClickHandler}>{this.props.name}</button>
    );
  }
}