import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./NoteListMain.css";
import Note from "./Note";
import NotesContext from "./NotesContext";
import { getNotesForFolder } from "../notesHelpers";
import PropTypes from 'prop-types';

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
        console.log([notesForFolder])
        return (
            <section className='NoteListMain'>
                <ul className="notes-list">
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
                <div className='NoteListMain_button-container'>
                    <Link
                        to='/add-note'
                        type='button'
                        className="NoteListMain_add-note-button"
                    >
                        Add Note
                    </Link>
                </div>
            </section>
        )
    }
}

NoteListMain.propTypes = {
    match: PropTypes.object
}

export default NoteListMain;