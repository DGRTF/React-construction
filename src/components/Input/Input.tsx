import React from 'react';
import './Input.scss';

interface IInputProps {
  text?: string;
  name: string;
}

export default class Input extends React.Component<IInputProps>{
  render() {
    return (
      <label className='input-default'>
        <span>{this.props.text}</span>
        <input className='input-default__field' type="text" name={this.props.name} />
      </label>
    );
  }
}