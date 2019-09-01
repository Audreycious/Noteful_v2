import React from 'react'
import Note from './Note'
import NotesContext from './NotesContext'
import { findNote } from '../notesHelpers'
import './NotePageMain.css'
import PropTypes from 'prop-types'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotesContext

  handleDeleteNote = () => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain_content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
      )}
}

NotePageMain.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}