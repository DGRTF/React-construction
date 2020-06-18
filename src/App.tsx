import React from 'react';
import Hierarchy from './components/Hierarchy';
import { connect } from 'react-redux';
import * as actions from "./store/actions";
import Table from './components/table/Table';
import store from './store/store';
import './App.scss';

interface IAppProps {
  machineJSONArr?: {
    id: number;
    name: string;
    createYear: number;
  }[];
}

export default class App extends React.Component<IAppProps> {

  constructor(prop: any) {
    super(prop);
  }

  render() {
    return (
      <div className='app'>
        <Hierarchy />
        <Table machineJSONArr={this.props.machineJSONArr} />
      </div>
    );
  }
};

store.dispatch({
  type: "SET_STATE",
  state: {
    machineJSONArr: [{ id: 1, name: 'name', createYear: 1980 }]
  }
});

function mapStateToProps(state: any) {
  return {
    machineJSONArr: state.get("machineJSONArr")
  };
}

connect(mapStateToProps, actions)(Hierarchy);