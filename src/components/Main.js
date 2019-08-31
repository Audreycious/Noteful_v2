import React, { Component } from 'react';
import "./Main.css";
import Note from "./Note";

class Main extends Component {
    render() {
        let notes = this.props.notes;
        let folderId = this.props.folderId;
        if (folderId) {
                notes = notes.filter(note => note.folderId === folderId
            )
        }
        return (
            <div className="App-main">
                <ul className="notes-list">
                    {notes.map(note => 
                        <li key={note.id} >
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
                <button className="add-note-button">Add folder</button>
          </div>
        );
    }
}

export default Main;
