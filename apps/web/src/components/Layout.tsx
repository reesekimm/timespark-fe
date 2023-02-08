import { Outlet } from 'react-router-dom'
import { Footer } from '@timespark/components'
import styled from 'styled-components'
import Header from './Header'

function Layout() {
  return (
    <StyledLayout>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </StyledLayout>
  )
}

export default Layout

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
    padding: 1.5rem;
  }
`
