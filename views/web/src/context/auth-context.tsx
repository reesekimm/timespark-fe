import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState
} from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true
    callback()
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false
    callback()
  }
}

interface AuthContextType {
  isAuthenticated: boolean
  signin: (callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContextType>(null!)

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setInAuthenticated] = useState(false)

  const signin = (callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      callback()
      setInAuthenticated(true)
    })
  }

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      callback()
      setInAuthenticated(false)
    })
  }

  const value = {
    isAuthenticated,
    signin,
    signout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

function RequireAuth({ children }: { children: ReactElement }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to='/auth' state={{ from: location }} replace />
  }

  return children
}

export { AuthProvider, useAuth, RequireAuth }
