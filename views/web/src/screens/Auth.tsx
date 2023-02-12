import { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    auth.signin(() => {
      navigate(from, { replace: true })
    })
  }

  return (
    <div>
      <p>Keep tracking your time and make it more predictable!</p>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Auth
