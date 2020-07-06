import React from 'react';
import './Input.scss';

interface IInputProps {
  text?: string;
  value?: string
  name: string;
  type?: string;
}

interface IInputState {
  value?: string;
}

export default class Input extends React.Component<IInputProps, IInputState>{
  constructor(prop: any) {
    super(prop);
    this.state = {
      value: this.props.value,
    }
  }

  render() {
    return (
      <label className='input-default'>
        <span>{this.props.text}</span>
        <input className='input-default__field'
          onChange={this.ChangeValue.bind(this)}
          type={this.props.type ? this.props.type : 'text'}
          name={this.props.name}
          value={this.state.value}
        />
      </label>
    );
  }

  ChangeValue(ev: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      value: ev.currentTarget.value,
    });
  }

  componentDidUpdate(prevProps: IInputProps) {
    if (this.props.value !== prevProps.value)
      this.setState({
        value: this.props.value,
      });
  }

}