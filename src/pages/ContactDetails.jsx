import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Button, ListGroup } from 'react-bootstrap'
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { ContactContext } from '../context/Contact.context'
import { AuthContext } from '../context/Auth.Context'

function ContactDetails() {
  const { contacts, deleteContact } = useContext(ContactContext)
  const { user } = useContext(AuthContext)
  const [contact, setContact] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  const foundContact = contacts.find((contact) => contact.id === +id)
  useEffect(() => {
    if (id && foundContact) {
      setContact(foundContact)
    }
  }, [id])

  const isOwner = user.id === foundContact?.author?.data?.id

  const handleDelete = (id) => {
    deleteContact(id)
  }
  const {
    firstName,
    lastName,
    email,
    profession,
    bio,
    gender,
    dateOfBirth,
    image,
  } = contact
  return (
    <>
      <h2 className='text-center mb-3'>Contact Details</h2>
      {Object.keys(contact).length === 0 ? (
        <p>No Contact to Show </p>
      ) : (
        <Card className='mb-3'>
          <div className='d-flex'>
            <Card.Img className='card-img' src={image} />
            <Card.Body>
              <Card.Title>
                <span className='text-dark'>
                  {firstName} {lastName}
                </span>
              </Card.Title>
              <Card.Subtitle className='mb-3 text-muted'>
                {profession}
              </Card.Subtitle>
              <Card.Text>{bio}</Card.Text>
              <ListGroup className='list-group-flush'>
                <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                <ListGroup.Item> Email: {email}</ListGroup.Item>
                <ListGroup.Item>
                  Date of Birth:{' '}
                  {dateOfBirth instanceof Object
                    ? format(dateOfBirth, 'dd/MM/yyyy')
                    : dateOfBirth}
                </ListGroup.Item>
              </ListGroup>
              <div className='card-btn mt-3'>
                {isOwner && (
                  <>
                    <Card.Link as={Link} to={`/edit-contact/${id}`}>
                      <Button variant='warning ms-3' size='md' type='view'>
                        <FaPencilAlt />
                      </Button>
                    </Card.Link>
                    <Card.Link>
                      <Button
                        variant='danger ms-3'
                        size='md'
                        onClick={() => handleDelete(id)}
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </Card.Link>
                  </>
                )}
              </div>
            </Card.Body>
          </div>
        </Card>
      )}
    </>
  )
}

export default ContactDetails
