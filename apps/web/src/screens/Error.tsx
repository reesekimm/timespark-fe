import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Layout from '../components/Layout'

export default function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <Layout>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </Layout>
    )
  } else {
    return <div>Oops</div>
  }
}
