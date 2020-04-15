import React from 'react';
import './App.css';

import Card from './Card.js';
import './Card.css';

import InputEvents from './events/InputEvents'
import MovementEvents from './events/MovementEvents'
import './events/Events.css';

import FormValidation from './events/FormValidation'

import ShoppingList from './events/ShoppingList'


function App() {
  return (
    <div className="App">
      <Card /> 
      {/* <Card /> 
      <Card /> */} 
      <FormValidation/>
      <InputEvents/>
      <MovementEvents/>
      <ShoppingList/>
      
    </div>
  );
}

export default App;
