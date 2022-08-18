import React from 'react'
import ContactForm from '../components/contacts/ContactForm'
import { ContactContext } from '../context/Contact.context'

function AddContact() {
  const { addContact } = React.useContext(ContactContext)
  return <ContactForm addContact={addContact} />
}

export default AddContact
