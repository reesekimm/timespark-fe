import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Layout from './components/Layout'
import { RequireAuth } from './context/auth-context'
import Auth from './screens/Auth'
import Dashboard from './screens/Dashboard'
import ErrorPage from './screens/Error'
import Home from './screens/Home'
import Settings from './screens/Settings'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path='auth' element={<Auth />} />
      <Route
        path='dashboard'
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path='settings' element={<Settings />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
