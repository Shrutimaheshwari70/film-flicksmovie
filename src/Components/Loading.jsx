import React from 'react'
import loader from '/loader.gif'

function Loading() {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img
        className='max-h-48 max-w-48 sm:max-h-64 sm:max-w-64 object-contain'
        src={loader}
        alt="Loading..."
      />
    </div>
  )
}

export default Loading
