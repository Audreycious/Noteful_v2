import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./Sidebar.css";

class Sidebar extends Component {
    static defaultProps = {
        folders: []
    }
    render() {
        let folders = this.props.folders;
        let noteId = this.props.noteId;
        console.log(noteId);
        return (
            <div className="App-sidebar">
                <ul className='Sidebar-list'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                        <NavLink
                            className='Sidebar-folder-link'
                            to={`/folder/${folder.id}`}
                        >
                            {folder.name}
                        </NavLink>
                    </li>
                    )}
                </ul>
                <div className='Sidebar-button-wrapper'>
                    { (noteId && 
                        <Link
                            to='/'
                            type='button'
                            className="Sidebar-go-back-button"
                        >
                            Go Back
                        </Link>) || 
                        <Link
                            to='/'
                            type='button'
                            className="Sidebar-add-folder-button"
                        >
                            Add Folder
                        </Link>
                    }
                </div>    
            </div>
        );
    }
}

export default Sidebar;
