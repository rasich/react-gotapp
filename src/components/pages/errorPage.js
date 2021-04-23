import React from 'react';
import {Link} from 'react-router-dom';

import './style.css'

const ErrorPage = () => {
  return(
    <div className='error-page'>
      <h1 className='error-title'>404</h1>

      <Link className='error-btn' to='/'>
          Game of Thrones DB
      </Link>
    </div>
  )
}

export default ErrorPage;