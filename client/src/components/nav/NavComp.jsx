import React from 'react'
import {Link } from 'react-router-dom';
import {useSelector } from 'react-redux';

function Navbar() {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to="/">
                <h1 className="font-bold">Finspace</h1>
            </Link>
            <ul>
              <Link to="/profile">
                {currentUser ? (
                <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
              ) : (
                <li>Sign In</li>
              )}
              </Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar