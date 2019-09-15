import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import './Note.css'
import NotesContext from "./NotesContext"
import PropTypes from 'prop-types'
import config from "../config"

class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => {},
        dateString: [],
    }
    static contextType = NotesContext

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id
    
        fetch(config.API_ENDPOINT + `api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then(response => {
              if (!response.ok)
                return response.json().then(responseJson => Promise.reject(responseJson))
              return response.json()
            })
            .then(() => {
              this.context.deleteNote(noteId)
              this.props.onDeleteNote(noteId)
            })
            .catch(responseJson => {
              alert({ responseJson })
            })
    }

    render() {
        let dateString = this.props.modified;
        let dateTime = DateTime.fromISO(dateString).toFormat('LLL dd, yyyy')
        return (
            <div className='Note'>
                <h2 className='Note-title'>
                    <Link to={`/notes/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                </h2>
                <button 
                    className='Note-delete' type='button'
                    onClick={this.handleClickDelete}>
                    Remove
                </button>
                <div className='Note-dates-modified'>
                    Modified:
                    {' '}
                    {dateTime}
                </div>
            </div>
        )
    }
}

Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}

export default Note