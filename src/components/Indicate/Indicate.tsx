import React, { Component } from 'react';
import './Indicate.scss';


interface IIndicateProps {
  indicate: boolean;
}

export default class Indicate extends Component<IIndicateProps>{
  render() {
    return (
      <div className='indicate' style={this.props.indicate ? { backgroundColor: 'green' } : { backgroundColor: 'red' }}></div>
    );
  }
}