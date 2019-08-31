import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
            <h1>Noteful</h1>
          </header>
          <div className="App-main-container">
            <Switch>  
              <Route 
                exact path='/' 
                render={(props) =>
                  <React.Fragment>
                    <Sidebar 
                      folder={folders}
                      handleShowFolder={this.handleShowFolder}
                      {...props}
                    />
                    <Main
                      notes={notes}
                      handleShowNote={this.handleShowNote} 
                    />
                  </React.Fragment>  
                } 
              />
              <Route 
                path='/folder.:folderId' 
              
              />
              <Route 
                path='/note.:noteId' 
              
              />
              {/* <Route 
                path="/add-folder" 
                component={} 
              />
              <Route 
                path="/add-note" 
                component={} 
              /> */}
            </Switch>  
          </div>
        </div>
    );
  }
}

export default App;
