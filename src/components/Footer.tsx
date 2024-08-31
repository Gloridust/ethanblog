import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Ethan Zou. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer