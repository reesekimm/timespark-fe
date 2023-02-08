import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './screens/Dashboard'
import Home from './screens/Home'
import Settings from './screens/Settings'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='settings' element={<Settings />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
