import React from 'react'
import notfound from '../assets/images/img-error-404-BQBFCdb-.svg'
import {Link} from 'react-router-dom'
import '../assets/css/notfound.css'
const NotFound404 = () => {
  return (
    <div className='notfound'>
        <div className='notfoundMain'>
        <img src={notfound} alt="not found" />
        <h1>Page Not Found</h1>
       <p>The page you are looking was moved, removed, renamed, or might never exist!</p>
      <Link to='/'><button>Back To home</button></Link>

        </div>
       
       
    </div>
  )
}

export default NotFound404