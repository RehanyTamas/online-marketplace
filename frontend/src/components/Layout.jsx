import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <nav class="flex flex-wrap">
        <div class="flex-shrink-0 p-2">
          <Link class="no-underline border-b border-blue text-blue-600" to="../">
            Home
          </Link>
        </div>
        <div class="flex-shrink-0 p-2">
          <Link class="no-underline border-b border-blue text-blue-600" to="../register/">
            Register
          </Link>
        </div>
        <div class="flex-shrink-0 p-2">
          <Link class="no-underline border-b border-blue text-blue-600" to="../login/">
            Login
          </Link>
        </div>
      </nav>
      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default Layout
