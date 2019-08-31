import React, { Component } from 'react';
import "./Sidebar.css";

class Sidebar extends Component {
    render() {
        return (
            <div className="App-sidebar">
                <ul className="folder-list">
                <li>Folder 1</li>
                <li>Folder 2</li>
                <li>Folder 3</li>
                </ul>
                <button className="add-folder-button">Add folder</button>
          </div>
        );
    }
}

export default Sidebar;
