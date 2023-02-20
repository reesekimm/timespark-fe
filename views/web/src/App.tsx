import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import { RequireAuth } from './context/auth-context'
import Auth from './screens/Auth'
import Dashboard from './screens/Dashboard'
import FullPageError from './screens/FullPageError'
import Home from './screens/Home'
import Settings from './screens/Settings'

export const routeConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <FullPageError />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        )
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
]

const router = createBrowserRouter(routeConfig)

function App() {
  return <RouterProvider router={router} />
}

export default App
