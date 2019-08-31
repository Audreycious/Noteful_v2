import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Main.css";
import Note from "./Note";

class Main extends Component {
    static defaultProps={
        notes: []
    }
    render() {
        let notes = this.props.notes;
        let folderId = this.props.folderId;
        let noteId = this.props.noteId;
        let contentHolder = null;
        if (folderId) {
            notes = notes.filter(note => note.folderId === folderId)
        }
        if (noteId) {
            notes = notes.filter(note => note.id === noteId)
            notes.forEach(note => {
                contentHolder = note.content
            })
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
                { (noteId && contentHolder) || 
                    <Link
                        to='/'
                        type='button'
                        className="Main-add-note-button"
                    >
                        Add Note
                    </Link>
                }
          </div>
        );
    }
}

export default Main;
