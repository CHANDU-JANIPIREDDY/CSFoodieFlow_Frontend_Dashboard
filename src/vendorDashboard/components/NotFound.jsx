import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="errorSection">
        <h1 className='pn-heading'>404</h1>
        <div className='pn-paragraph'>Page Not Found</div>
        <Link to='/'>
        <p>Go Back</p>
        </Link>
    </div>
  )
}

export default NotFound