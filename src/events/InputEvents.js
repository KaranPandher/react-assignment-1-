import React, { Component } from 'react';

class InputEvents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseDown: false,
      mouseClicked: 0,
      inputText: 'Hello world',
      formInputText: 'Hello world 2'
    } 
    // This is cruical for the functions to execute they must be binded. 
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this)
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

 /* Component for handle on click*/
  handleOnClick() {
      // Below it will print mouseClicked which is 0 in console. 
      //console.log(this.state.mouseClicked)
      // To update the State use this.setState. 
      // This is a dedicated method to update the state. 
      //this.setState({
     //     mouseClicked: this.state.mouseClicked + 1
    //  })
      // Alternative approahc is this.setState passed thrugh a function that gives us access to the state and returns a similar function. Except react gives us that state so dont need to use this.setState . Code is cleaned up. 

      // Simpler then above. 
      this.setState((state) => {
          return {
              mouseClicked: state.mouseClicked +1
          }
      })
  }

  handleOnMouseDown() {
      this.setState((state) => {
          return {
              mouseDown: true
          }
      })
  }

  handleOnMouseUp() {
      this.setState((state) => {
          return {
              mouseDown: false
          }
      })
  }
  // event is a type of react command. event.target.value is used to enter any value
  // Return is not used here because we arent returning anything. we are making the input text a dynamic variable 
  handleOnChange(event) {
      this.setState({
          inputText: event.target.value
      })
  } 

  handleOnSubmit = (event) => {
      event.preventDefault()
      this.setState({
          formInputText: event.target.value,
          formInputTextSubmitted: this.state.formInputText
      })
  }

  render() {
    return (
      <>
      <section>
        <h3>Mouse events:</h3>
        {/* Created a componenet above to do it here ALSO have to bind the handles */}
        <button onClick = {this.handleOnClick}
            onMouseDown = {this.handleOnMouseDown}
            onMouseUp = {this.handleOnMouseUp}
        > 
        
          Click me
        </button>
        <p>Button mouse down: {this.state.mouseDown ? 'true' : 'false'}</p>
        <p>Button clicked: {this.state.mouseClicked}</p>
      </section>

      <section>
        <h3>Input change events:</h3>
        <input
          type="text"
          value={this.state.inputText}
          onChange = {this.handleOnChange}
        />
        <p>Input value: {this.state.inputText}</p>
      </section>

      <section>
        <h3>Form Submit events:</h3>
        <form onSubmit = {this.handleOnSubmit}>
          <input
            type="text"
            value={this.state.formInputText}
          />
          <button type="submit">Submit</button>
          <p>Input value: {this.state.formInputText}</p>
          <p>Submitted value: {this.state.formInputTextSubmitted}</p>
        </form>
      </section>
      </>
    )
  }
}

export default InputEvents;