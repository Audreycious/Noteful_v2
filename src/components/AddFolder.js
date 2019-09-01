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
    let randomId = '_' + Math.random().toString(36).substr(2, 9);
    const folder = {
        id: randomId,
        name: e.target['folder-name'].value
    }
    let validation = this.validateName(folder.name)
    if (validation) {
      alert(validation)
    }
    else {
      fetch('http://localhost:9090/folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(response => {
        if (!response.ok)
          return response.json().then(responseJson => Promise.reject(responseJson))
        return response.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(responseJson => {
        alert(responseJson)
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