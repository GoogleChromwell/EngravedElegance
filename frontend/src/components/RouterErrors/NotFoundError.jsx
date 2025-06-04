import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundError() {
  return (
    <div>
        <div className='flex items-center justify-center min-h-screen'>

            <div className='flex flex-col shadow-xl drop-shadow-xl p-10 gap-6'>
                <div className='items-center'>
                    <h1 className='text-red-700 text-xl font-bold'>404 NOT FOUND</h1>
                </div>
                <div className='place-self-center'>
                    <Link to={'/'} className='bg-blue-700 text-white p-2 rounded-md font-medium hover:bg-blue-800'>Return to homepage</Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}
