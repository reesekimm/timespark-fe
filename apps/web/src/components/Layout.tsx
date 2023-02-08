import { Outlet } from 'react-router-dom'
import { Footer } from '@timespark/components'
import Header from './Header'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
