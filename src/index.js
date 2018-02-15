import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';

const theme = getMuiTheme({
    cardText: {
      padding: 10,
    },
  });

ReactDOM.render(
    (<MuiThemeProvider muiTheme={ theme }>
      <Provider store={ store } >
        <App />
      </Provider>
    </MuiThemeProvider>),
    document.getElementById('root'));
registerServiceWorker();