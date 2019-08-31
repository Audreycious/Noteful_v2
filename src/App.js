import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import STORE from "./store";
import NoteListNav from './components/NoteListNav'
import NotePageNav from './components/NotePageNav'
import NoteListMain from './components/NoteListMain'
import NotePageMain from './components/NotePageMain'
// import AddFolder from '../AddFolder/AddFolder'
// import AddNote from '../AddNote/AddNote'
import NotesContext from "./components/NotesContext";

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    setTimeout(() => this.setState(STORE), 600);
  }

  handleAddNote = (note) => {
    this.setState({})
  }

  handleDeleteNote = (note) => {
    this.setState({})
  }

  handleAddFolder = (folder) => {
    this.setState({})
  }

  renderNavRoutes() {
    return (
      <React.Fragment>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
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
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        {/* <Route
          path='/add-folder'
          component={}
        />
        <Route
          path='/add-note'
          component={}
        /> */}
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
              <nav className='App-nav'>
                {this.renderNavRoutes()}
              </nav>
              <main className='App-main'>
                {this.renderMainRoutes()}
              </main>
            </NotesContext.Provider> 
          </div>
        </div>
    );
  }
}

export default App;
