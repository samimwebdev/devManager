import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

function AddContact({ addContact }) {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    email: '',
    bio: '',
    image: '',
    dateOfBirth: new Date(),
    gender: 'male',
  })

  const handleChange = (evt) => {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(contact)
    //checking validation
    //if passed then submit the form
    //Form Submission
    addContact(contact)
  }

  const {
    firstName,
    lastName,
    email,
    profession,
    dateOfBirth,
    gender,
    bio,
    image,
  } = contact

  return (
    <>
      <h2 className='text-center'>Add Contact</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='firstName' column>
              First Name
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='text'
              id='firstName'
              name='firstName'
              onChange={handleChange}
              value={firstName}
              placeholder='Enter Your First Name'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='lastName' column>
              Last Name
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='text'
              id='lastName'
              name='lastName'
              onChange={handleChange}
              value={lastName}
              placeholder='Enter Your Last Name'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='email' column>
              Email
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
              value={email}
              placeholder='Enter Your Email'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='profession' column>
              Profession
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='profession'
              id='profession'
              name='profession'
              onChange={handleChange}
              value={profession}
              placeholder='Enter Your profession'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='image' column>
              Profile Picture
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='text'
              id='image'
              name='image'
              onChange={handleChange}
              value={image}
              placeholder='Enter Link of Your profile picture'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='dateOfBirth' column>
              Date of Birth
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='date'
              id='dateOfBirth'
              name='dateOfBirth'
              onChange={handleChange}
              value={dateOfBirth}
              placeholder='Enter Your Date of Birth'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='gender' column>
              Gender{' '}
            </Form.Label>
          </Col>
          <Col xs='auto'>
            <Form.Check
              type='radio'
              onChange={handleChange}
              name='gender'
              label='Male'
              value='male'
              checked={gender === 'male'}
            />
          </Col>
          <Col xs='auto'>
            <Form.Check
              type='radio'
              onChange={handleChange}
              name='gender'
              label='Female'
              value='female'
              checked={gender === 'female'}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='firstName' column>
              Bio
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              as='textarea'
              type='text'
              id='bio'
              name='bio'
              onChange={handleChange}
              value={bio}
              placeholder='Enter Your Bio'
            />
          </Col>
        </Form.Group>
        <Button variant='primary' size='md' type='submit'>
          Add Contact
        </Button>
      </Form>
    </>
  )
}

export default AddContact
