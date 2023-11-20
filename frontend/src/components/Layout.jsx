import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default Layout
