import React from 'react'
import { Link } from "react-router-dom"
import NotesContext from './NotesContext'
import { findNote, findFolder } from '../notesHelpers'
import './NotePageNav.css'
import PropTypes from 'prop-types'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = NotesContext;

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
        <Link
          tag='button'
          to="#"
          onClick={() => this.props.history.goBack()}
          className='NotePageNav_back-button'
        >
          Go Back
        </Link>
        {folder && (
          <h3 className='NotePageNav_folder-name'>
            <span className="folderNameLabel">Folder:</span> 
            <br/>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}