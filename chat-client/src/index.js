import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/modules';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
