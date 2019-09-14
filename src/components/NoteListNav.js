import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { countNotesForFolder } from '../notesHelpers'
import './NoteListNav.css'
import NotesContext from "./NotesContext"

export default class NoteListNav extends React.Component {
  static contextType = NotesContext;
  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav_list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav_folder-link'
                to={`/folders/${folder.id}`}
              >
                <span className='NoteListNav_num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav_button-wrapper'>
          <Link
            to="/add-folder"
            type='button'
            className='NoteListNav_add-folder-button'
          >
            Add Folder
          </Link>
      </div>
    </div>
  )}
}

NoteListNav.defaultProps = {
  folders: []
}