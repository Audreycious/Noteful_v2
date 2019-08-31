import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./NoteListMain.css";
import Note from "./Note";
import NotesContext from "./NotesContext";
import { getNotesForFolder } from "../notesHelpers";

class NoteListMain extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = NotesContext;

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className='NoteListMain'>
                <ul>
                {notesForFolder.map(note =>
                    <li key={note.id}>
                    <Note
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                    />
                    </li>
                )}
                </ul>
                <div className='NoteListMain__button-container'>
                
                </div>
            </section>
        )
    }
}

export default NoteListMain;