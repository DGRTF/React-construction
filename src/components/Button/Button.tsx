import React, { Component } from 'react';
import './Button.scss';

interface ISubmitProps {
  name: string;
  ClickHandler?: (ev: React.MouseEvent) => void;
  font?: string;
}

export default class Submit extends Component<ISubmitProps> {
  render() {
    return (
      <button
        className={'button-default' + this.CheckFont()}
        onClick={this.props.ClickHandler}>
        {this.props.name}</button>
    );
  }

  private CheckFont() {
    switch (this.props.font) {
      case 'icons':
        return ' font-icons18'
      case 'icons24':
        return ' font-icons24'
      default:
        return ''
    }
  }
}