// What we are building: 
import React, {Component} from 'react';
import './Card.css';
// Uses your css elements as well here. 

// Must have a componenet function as this is basic for every react application
// Fragments are used to  prevent unnecessary elements like constant <divs>  
class Card extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            firstName: 'Karan Pandher',
            initials: 'KP',
            info: [
              { title: 'Birthday', text: 'Dec 4, 1994' },
              { title: 'Address', text: '6969 143 Ave NW' },
              { title: 'Phone', text: '780-666-4070' },
              { title: 'Email', text: 'pandabear@ualberta.ca'}
            ]
        }
    }
    render() {
        const {
            firstName,
            initials, 
            info
        } = this.state 
        
        return ( 
        <React.Fragment> 
        
            <section className = "card-container">
                <header className = "card-header">
                    <span initials = {initials}></span>
                    <h2>{ firstName }</h2>
                </header>
                <main>
            <ul>
                {info.map((row, index) => {
                    return (
                        <li key = {index}>
                            <span>{row.title}</span>
                            {row.text ? row.text: 'n/a'}
                        </li>
                    )
                })}
            </ul>
          </main>
            </section>
        </React.Fragment>
            )
    }
}

export default Card; 