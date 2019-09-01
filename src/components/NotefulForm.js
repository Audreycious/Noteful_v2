import React from 'react'
import './NotefulForm.css'
import NotefulFormError from './NotefulFormError';

export default function NotefulForm(props) {
  let { ...propsChildren } = props;
  return (
    <NotefulFormError>
      <form
        className={'Noteful-form'}
        action='#'
        {...propsChildren}
      />
    </NotefulFormError>
  )
}