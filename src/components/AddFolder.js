import React, { Component } from 'react'
import NotefulForm from './NotefulForm'
import NotesContext from './NotesContext'
// import './AddFolder.css'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotesContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
        name: e.target['folder-name'].value
    }
    let validation = this.validateName(folder.name)
    if (validation) {
      alert(validation)
    }
    else {
      let addFolderURL = "http://localhost:8000/api/add-folder"
      let options = {
        method: 'POST',
        body: JSON.stringify(folder),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      fetch(addFolderURL, options)
        .then(response => {
          if (!response.ok) {
            return response.json().then(responseJson => Promise.reject(responseJson))
          }
          return response
        })
        .then(response => response.json())
        .then(folder => {
          this.context.addFolder(folder)
          return this.props.history.push(`/folders/${folder.id}`)
        })
    }
  }

  validateName(name) {
    if (name.length === 0) {
      return 'Name is required';
    } 
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add Folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}