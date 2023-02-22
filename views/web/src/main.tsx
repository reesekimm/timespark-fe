import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProviders } from './context'
import App from './App'
import { worker } from './mock/server/dev-server'

async function prepareMockServer() {
  // if (import.meta.env.DEV) {
  return worker.start({ onUnhandledRequest: 'bypass' })
  // }
}

prepareMockServer().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  )
})
