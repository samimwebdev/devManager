import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './routes/App'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import { ContactProvider } from './context/Contact.context'
import { AuthProvider } from './context/Auth.Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContactProvider>
          <App />
        </ContactProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
