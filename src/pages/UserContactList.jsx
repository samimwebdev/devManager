import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import { Table, Button } from 'react-bootstrap'
import { ContactContext } from '../context/Contact.context'
import { Link } from 'react-router-dom'

function UserContactList() {
  const { userContacts, loaded, setTriggerDelete } = useContext(AuthContext)

  const { deleteContact } = useContext(ContactContext)

  const handleDelete = (id) => {
    deleteContact(id)
    setTriggerDelete(true)
  }
  return (
    loaded && (
      <Table striped size='md'>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>profession</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {userContacts.map((userContact) => {
            return (
              <tr key={userContact.id}>
                <td>{userContact.id}</td>
                <td>{userContact.firstName}</td>
                <td>{userContact.lastName}</td>
                <td>{userContact.email}</td>
                <td>{userContact.profession}</td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(userContact.id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant='secondary'
                    as={Link}
                    to={`/edit-contact/${userContact.id}`}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  )
}

export default UserContactList
