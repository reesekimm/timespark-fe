import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import { RequireAuth } from './context/auth-context'
import Auth from './screens/Auth'
import Dashboard from './screens/Dashboard'
import FullPageError from './screens/FullPageError'
import Home from './screens/Home'
import Settings from './screens/Settings'
import { useCreateTask } from './utils/query-tasks'
import { removeActiveTask } from './utils/timerWorker'

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
  const createTask = useCreateTask()

  useEffect(() => {
    removeActiveTask()

    // 임시 추가
    createTask.mutate({
      categoryId: '',
      title: '정보통신망 3강',
      estimatedDuration: 50 * 60
    })

    createTask.mutate({
      categoryId: '638092b7-0693-4494-9e2e-62e58b399e03',
      title: '프로그래머의 길, 멘토에게 묻다 읽기',
      estimatedDuration: 50 * 60
    })

    createTask.mutate({
      categoryId: '4d1a061e-f976-445a-8f1b-c2811829912e',
      title: 'Serverless Framework 6강',
      estimatedDuration: 60 * 60
    })

    createTask.mutate({
      categoryId: '84cbe7a4-54ef-4c71-8810-ca2ba957f47a',
      title: '타입스크립트 공부',
      estimatedDuration: 30 * 60
    })
  }, [])

  return <RouterProvider router={router} />
}

export default App
