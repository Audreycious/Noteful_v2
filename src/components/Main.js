import React, { Component } from 'react';
import "./Main.css";

class Main extends Component {
    render() {
        let notes = this.props.notes;
        return (
            
            <div className="App-main">
                <ul className="">
                    <li>Note 1 <button>Delete Note</button></li>
                    <li>Note 2 <button>Delete Note</button></li>
                    <li>Note 3 <button>Delete Note</button></li>
                    <li>Note 4 <button>Delete Note</button></li>
                </ul>
                <button className="add-note-button">Add folder</button>
          </div>
        );
    }
}

export default Main;
