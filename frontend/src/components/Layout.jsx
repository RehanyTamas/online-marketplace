import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div>
      <Link class="no-underline border-b border-blue text-blue-600" to="../register/">
        register
      </Link>
      </div>
      <div>
      <Link class="no-underline border-b border-blue text-blue-600" to="../login/">
        Login
      </Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
