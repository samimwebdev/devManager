import React from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'
import { FaEye, FaRegTrashAlt } from 'react-icons/fa'

export default function Contact({ contact, deleteContact }) {
  const {
    id,
    firstName,
    lastName,
    email,
    profession,
    bio,
    image,
    gender,
    dateOfBirth,
  } = contact
  return (
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
            <ListGroup.Item>Date of Birth: {dateOfBirth}</ListGroup.Item>
          </ListGroup>
          <div className='card-btn mt-3'>
            <Card.Link>
              <Button variant='warning ms-3' size='md' type='view'>
                <FaEye />
              </Button>
            </Card.Link>
            <Card.Link>
              <Button
                variant='danger ms-3'
                size='md'
                onClick={() => deleteContact(id)}
              >
                <FaRegTrashAlt />
              </Button>
            </Card.Link>
          </div>
        </Card.Body>
      </div>
    </Card>
  )
}
