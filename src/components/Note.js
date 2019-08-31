import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import './Note.css'

export default function Note(props) {
    let dateString = props.modified;
    let dateTime = DateTime.fromISO(dateString).toFormat('LLL dd, yyyy');
    return (
        <div className='Note'>
            <h2 className='Note-title'>
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className='Note-delete' type='button'>
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