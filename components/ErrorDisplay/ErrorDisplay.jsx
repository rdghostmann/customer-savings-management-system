import React from 'react'

const ErrorDisplay = ({ message, reset }) => {
  return (
    <div className="text-gray-900">
      <p>{message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default ErrorDisplay
