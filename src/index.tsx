import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/store';
import AddConstruction from './components/AddConstruction/AddConstruction';
import AddRoom from './components/AddRoom/AddEditRoom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <AddConstruction />
      <AddRoom />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();




