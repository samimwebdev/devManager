import React from 'react'
import Contact from '../components/contacts/Contact'

function Contacts({ contacts, deleteContact }) {
  return (
    <>
      <h2 className='text-center'>All Contacts</h2>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
        />
      ))}
    </>
  )
}

export default Contacts
