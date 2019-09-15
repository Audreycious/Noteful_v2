import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import NoteListNav from './components/NoteListNav'
import NotePageNav from './components/NotePageNav'
import NoteListMain from './components/NoteListMain'
import NotePageMain from './components/NotePageMain'
import AddFolder from './components/AddFolder'
import AddNote from './components/AddNote'
import NotesContext from "./components/NotesContext"
import NoteMainError from './NoteMainError'
import NoteNavError from './NoteNavError'
import config from "./config"

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    let foldersURL = config.API_ENDPOINT + `api/folders`
    let notesURL = config.API_ENDPOINT + `api/notes`
    Promise.all([
      fetch(foldersURL),
      fetch(notesURL)
    ])
    .then(([foldersRes, notesRes]) => {
      if (!foldersRes.ok) {
        foldersRes.json()
        .then(folderJson => Promise.reject(folderJson))
      }
      if (!notesRes.ok) {
        notesRes.json()
        .then(notesJson => Promise.reject(notesJson))
      }
      return Promise.all([
        foldersRes.json(),
        notesRes.json()
      ])
    })
    .then(([folders, notes]) => {
      // console.log([folders, notes])
      this.setState({folders, notes})
    })
    .catch(error => {
      alert(error.message)
    })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleDeleteNote = noteId => {
    let newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  renderNavRoutes() {
    return (
      <React.Fragment>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/notes/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </React.Fragment>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/notes/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder
    }
    return (
        <div className="App">
          <header className="App-header">
            <Link to="/" className="home-button">Noteful</Link>
          </header>
          <div className="App-main-container">
            <NotesContext.Provider value={contextValue} >   
              <NoteNavError>
                <nav className='App-nav'>
                  {this.renderNavRoutes()}
                </nav>
              </NoteNavError>
              <NoteMainError>
                <main className='App-main'>
                  {this.renderMainRoutes()}
                </main>
              </NoteMainError>
            </NotesContext.Provider> 
          </div>
        </div>
    );
  }
}

export default App;
