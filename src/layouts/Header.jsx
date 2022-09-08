import React, { useContext, useState } from 'react'
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth.Context'

function Header({ setSearchInput }) {
  const { logout, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [text, setText] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(text)
    setSearchInput(text)
    //navigate to search component
    setText('')
    navigate('/search')
  }

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='brand'>
          Dev Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {user && (
              <>
                <Nav.Link as={NavLink} to='/contacts'>
                  Contacts
                </Nav.Link>
                <Nav.Link as={NavLink} to='/add-contact'>
                  Add Contact
                </Nav.Link>
                <Nav.Link as={NavLink} to='/dashboard/profile'>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
            {!user && (
              <>
                <Nav.Link as={NavLink} to='/register'>
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to='/login'>
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form onSubmit={handleSubmit} className='d-flex'>
              <Form.Control
                type='search'
                onChange={(evt) => setText(evt.target.value)}
                value={text}
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
              <Button type='submit' variant='outline-success'>
                Search
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
