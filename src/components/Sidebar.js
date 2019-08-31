import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./Sidebar.css";

class Sidebar extends Component {
    static defaultProps = {
        folders: [],
        historyPath: {
            goBack: () => {}
        }
    }
    render(props) {
        let folders = this.props.folders;
        let noteId = this.props.noteId;
        let notes = this.props.notes;
        let historyPath = this.props.history;
        let folderHolder = null;
        if (noteId) {
            notes = notes.filter(note => note.id === noteId)
            notes.forEach(note => {
                folderHolder = note.folderId
            })
        }
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
                        <React.Fragment>
                            <Link
                                to='#'
                                tag="button"
                                role="link"
                                type='button'
                                className="Sidebar-go-back-button"
                                onClick={() => {
                                    historyPath.goBack()}}
                            >
                                Go Back
                            </Link>
                            <p>
                                Folder: <br />
                                {folderHolder}
                            </p>
                        </React.Fragment>) || 
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
