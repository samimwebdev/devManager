import React, { useContext } from 'react'
import ContactForm from '../components/contacts/ContactForm'
import { useParams } from 'react-router-dom'
import { ContactContext } from '../context/Contact.context'
import Loader from '../components/Loader'

function EditContact() {
  const { id } = useParams()
  const { contacts, updateContact } = useContext(ContactContext)

  const foundContact = contacts.find((contact) => contact.id === +id)

  return foundContact ? (
    <ContactForm contact={foundContact} updateContact={updateContact} />
  ) : (
    <Loader />
  )
}

export default EditContact
