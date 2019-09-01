import React, { Component } from 'react'
import NotefulForm from './NotefulForm'
import NotesContext from './NotesContext'
import { DateTime } from "luxon"
// import './AddNote.css'

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotesContext;

  handleSubmit = e => {
    e.preventDefault()
    let dt = new DateTime.local();
    dt = dt.toISO();
    let randomId = '_' + Math.random().toString(36).substr(2, 9);
    const newNote = {
        id: randomId,
        name: e.target['note-name'].value,
        content: e.target['note-content'].value,
        folderId: e.target['note-folder-id'].value,
        modified: dt
    }
    let nameValidation = this.validateName(newNote.name);
    let folderValidation = this.validateFolder(newNote.folderId);
    if (nameValidation) {
      alert(nameValidation)
    }
    else if (folderValidation) {
      alert(folderValidation)
    }
    else {
      fetch(`http://localhost:9090/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newNote),
        })
          .then(response => {
            if (!response.ok)
              return response.json().then(responseJson => Promise.reject(responseJson))
            return response.json()
          })
          .then(responseJson => {
            this.context.addNote(responseJson)
            this.props.history.push(`/folder/${responseJson.folderId}`)
          })
          .catch(responseJson => {
            alert(responseJson)
          }
        )
      }
  }

  validateName(name) {
    if (name.length === 0) {
      return 'Name is required';
    } 
  }

  validateFolder(folderId) {
    if (folderId === "Select Folder") {
      return 'Select a folder';
    } 
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Add a NotefulForm</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>Select Folder</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <button type='submit'>
            Add Note
          </button>
        </NotefulForm>
      </section>
    )
  }
}