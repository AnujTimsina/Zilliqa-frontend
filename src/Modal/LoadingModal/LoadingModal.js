import React from 'react'
import './loadingModal.scss'

const LoadingModal = () => {
  return (
    <div className='flex flex-col w-100 h-100 items-center justify-center' >
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-xl font-semibold">Loading...</h2>
    </div>
  )
}

export default LoadingModal