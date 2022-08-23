import { useState, useContext } from 'react'
import Contacts from './pages/Contacts'
import Header from './layouts/Header'
import { Container } from 'react-bootstrap'
import AddContact from './pages/AddContact'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import EditContact from './pages/EditContact'
import ContactDetails from './pages/ContactDetails'

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header />

      <Container style={{ width: '800px', margin: '0 auto' }} className='pt-3'>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/add-contact' element={<AddContact />} />
          <Route path='/contacts/:id' element={<ContactDetails />} />
          <Route path='/edit-contact/:id' element={<EditContact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
