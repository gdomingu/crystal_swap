// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import actionCable from 'actioncable';

(function() {
  window.CableApp || (window.CableApp = {});
  CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
}).call(this);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
