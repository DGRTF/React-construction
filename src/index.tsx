import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/store';
import AddConstruction from './components/AddEditConstruction/AddEditConstruction';
import AddRoom from './components/AddEditRoom/AddEditRoom';
import AddEditMachine from './components/AddEditMachine/AddEditMachine';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <AddConstruction />
      <AddRoom />
      <AddEditMachine />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();




