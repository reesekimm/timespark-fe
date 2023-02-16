import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Layout from '../components/Layout'

export default function FullPageError() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Layout>
          <div>✋ This page does not exist!</div>
        </Layout>
      )
    }

    if (error.status >= 500) {
      return (
        <Layout>
          <div>⚠️ Sorry, Looks like our API is down. Try again later.</div>
        </Layout>
      )
    }
  }

  return (
    <Layout>
      <div>🚧 Uh oh... Something went wrong. Try refreshing the app.</div>
    </Layout>
  )
}
