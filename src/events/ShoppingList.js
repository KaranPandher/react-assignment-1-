import React, { Component } from 'react';

class ShoppingList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newItemName: '',
      groceryItems: [
        { name: 'Bananas', id: 'item-1', completed: false },
        { name: 'Apples', id: 'item-2', completed: true },
        { name: 'Rice', id: 'item-3', completed: false }
      ],
      validationErrors: {},
      submitted: 0
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCompletedToggle = this.handleCompletedToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.validateFields = this.validateFields.bind(this)
  }
  //Used for local storage and updates the local storage when any part of the stage is updated. Method provides acccess to the previous version of this state so we can make a comparision between the two version and determine if we want to perform this action 
  componentDidUpdate(prevProps, prevState){
    const prevStateString = JSON.stringify(prevState.groceryItems)
    const updatedStateString = JSON.stringify(this.state.groceryItems)
    // Pulls values from previous state and compares it to the update state. We are storing stringify versions. 

    // This makes sure there is a difference between the two states and if there is we want to perform localstorage.setItem this updates the string and stores it in the browsers storage. 
    // This only saves them but doesnt retrieve them. 
    if (prevStateString !== updatedStateString) {
      console.log("Save this:", updatedStateString)
      localStorage.setItem('groceryItems', updatedStateString)
    }
  }
  // This is used when the component is saved already (above) and now it will MOUNT it on the new reload and retrieve it from the local storage. 
  componentDidMount() {
    const savedStateFromLocalStorage = localStorage.getItem('groceryItems')
    
    if (savedStateFromLocalStorage) {
      this.setState({
        // We use JSON.parse so we can covnert it back to a string! 
        groceryItems: JSON.parse(savedStateFromLocalStorage)
      })
    }
  }

  handleOnChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleCompletedToggle(event) {
    const target = event.target
    const itemindexValue = target.attributes.itemindex.value
    const index = parseInt(itemindexValue, 10) // access input's custom attribute
    
    console.log('toggling: ' + index)
    
    //creates brand new array
    const newGroceryItemsState = [...this.state.groceryItems]
    //newGroceryItemsState[index].completed = target.checked
    
    // The lne above will be repalced. We create a brand new array the completed key is mutating this.state directly and we dont want that. So we will replace this code with a whole new object for the item being toggled and in this object the completed key gets the new value. 

    newGroceryItemsState[index] = {
      ...newGroceryItemsState[index],
      completed: target.checked
    }

    this.setState({
      groceryItems: newGroceryItemsState
    })
  }

  handleDelete(event) {
    const target = event.target
    const itemindexValue = target.attributes.itemindex.value
    const index = parseInt(itemindexValue, 10) // access button's custom attribute

    console.log('deleting: ' + index)

    const newGroceryItemsState = [...this.state.groceryItems]
    newGroceryItemsState.splice(index, 1)

    this.setState({
      groceryItems: newGroceryItemsState
    })
  }

  handleOnSubmit(event) {
    event.preventDefault()

    const isFormValid = this.validateFields()

    if (isFormValid) {
       
      const newGroceryItemObject = {
        completed: false,
        name: this.state.newItemName,
      // Have to add the ids from above . This ensures any new item that is made will have an id number now in this case item-xxx
        id: 'item-' + Date.now()
      }
      this.setState((state) => {
        return {
          submitted: state.submitted + 1,
          groceryItems: [...state.groceryItems, newGroceryItemObject],
          newItemName: ''
        }
      })
    }
  }

  validateFields() {
    const {
      newItemName
    } = this.state

    const errors = {}

    if (!newItemName) {
      errors['newItemName'] = 'Please enter new item name'
    }

    this.setState({
      validationErrors: errors
    })

    return Object.keys(errors).length === 0
  }

  render() {
    const {
      newItemName: newItemNameError,
    } = this.state.validationErrors

    const {
      groceryItems
    } = this.state

    return (
      <>
      <section>
        <h3>Shopping List</h3>
        { !groceryItems.length && <p>No items!</p> }
        <ul>
          {
            groceryItems.map((item, index) => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={this.handleCompletedToggle}
                    itemindex={index} // lowercase 'itemindex' as per React docs
                  />
                  <span>{item.name}</span>
                  <button
                    itemindex={index}
                    onClick={this.handleDelete}
                  >
                    ✕
                  </button>
                </li>
              )
            })
          }
        </ul>
        <form onSubmit={this.handleOnSubmit}>
          <label>
            <span className="error">{newItemNameError}</span>
            <input
              type="text"
              name="newItemName"
              placeholder="Bananas"
              value={this.state.newItemName}
              onChange={this.handleOnChange}
            />
          </label>

          <button type="submit">Submit</button>

          <p>Submitted {this.state.submitted} times!</p>
        </form>
      </section>
      </>
    )
  }
}

export default ShoppingList;