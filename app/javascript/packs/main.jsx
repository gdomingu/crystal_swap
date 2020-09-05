// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import actionCable from 'actioncable';
import { Provider } from "react-redux";
import rootReducer from "./reducers/root";
import { createStore } from "redux";
// import { I18nextProvider } from "react-i18next";
const store = createStore(rootReducer);

(function() {
  window.CableApp || (window.CableApp = {});
  CableApp.cable = actionCable.createConsumer()
}).call(this);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
