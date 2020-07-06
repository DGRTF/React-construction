import React, { Component } from 'react';
import './Indicate.scss';


interface IIndicateProps {
  indicate: boolean;
}

export default class Indicate extends Component<IIndicateProps>{
  render() {
    return (
      <div className='indicate font-icons14' style={this.props.indicate ? { color: 'green' } : { color: 'red' }}>check_circle</div>
    );
  }
}