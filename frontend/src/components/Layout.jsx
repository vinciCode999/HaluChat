import Sidebar from './Sidebar'
import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children, showSidebar }) => {
  return (
    <div className="min-h-screen">
      <div className="flex ">
        {showSidebar && <Sidebar />}

        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout