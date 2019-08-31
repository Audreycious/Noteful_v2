import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Main from "./components/Main"
import Sidebar from './components/Sidebar';
import STORE from "./store";

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(STORE), 600);
  }

  render() {
    const { notes, folders } = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <Link to="/" className="home-button">Noteful</Link>
          </header>
          <div className="App-main-container">
            <Switch>  
              <Route 
                exact path='/' 
                render={(props) =>
                  <React.Fragment>
                    <Sidebar 
                      folders={folders}
                      {...props}
                    />
                    <Main
                      notes={notes}
                      {...props}
                    />
                  </React.Fragment>  
                } 
              />
              <Route 
                path='/folder/:folderId' 
                render={(props) =>
                  <React.Fragment>
                    <Sidebar 
                      folders={folders}
                      {...props}
                    />
                    <Main
                      notes={notes}
                      {...props}
                      folderId={props.match.params.folderId}
                    />
                  </React.Fragment>  
                }
              />
              <Route 
                path='/note/:noteId' 
                render={(props) => 
                  <React.Fragment>
                    <Sidebar 
                      notes={notes}
                      noteId={props.match.params.noteId}
                    />
                    <Main
                      notes={notes}
                      noteId={props.match.params.noteId}
                    />
                </React.Fragment> 
                }
              />
              <Route 
                path="/add-folder" 

              />
              <Route 
                path="/add-note" 

              />
            </Switch>  
          </div>
        </div>
    );
  }
}

export default App;
