import { createContext, useReducer, useState } from 'react'

import contactsReducer from './reducer'
import { DELETE_CONTACT, ADD_CONTACT, UPDATE_CONTACT } from './types'

//create context
export const ContactContext = createContext()

const initialContacts = [
  {
    id: '1',
    firstName: 'Barbette',
    lastName: 'Pfertner',
    email: 'bpfertner0@drupal.org',
    profession: 'Web Developer',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/75.jpg',
    dateOfBirth: new Date(),
    bio: 'All About me',
  },
  {
    id: '2',
    firstName: 'Ignatius',
    lastName: 'McPhilip',
    email: 'imcphilip1@toplist.cz',
    profession: 'Software Developer',
    gender: 'male',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    dateOfBirth: new Date(),
    bio: 'All About me',
  },
  {
    id: '3',
    firstName: 'Fletch',
    lastName: 'Veel',
    email: 'fveel2@yellowbook.com',
    profession: 'Graphic Designer',

    gender: 'male',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    dateOfBirth: new Date(),
    bio: 'All About me',
  },
  {
    id: '4',
    firstName: 'Shawn',
    lastName: 'Lawrenz',
    email: 'slawrenz3@independent.co.uk',
    profession: 'Data entry specialist',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/80.jpg',
    dateOfBirth: new Date(),
    bio: 'All About me',
  },
  {
    id: '5',
    firstName: 'Bucky',
    lastName: 'Casaccio',
    email: 'bcasaccio4@netlog.com',
    gender: 'male',
    profession: 'Data scientist',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    dateOfBirth: new Date(),
    bio: 'All About me',
  },
  {
    id: '6',
    firstName: 'Regan',
    lastName: 'Lodford',
    email: 'rlodford5@nbcnews.com',
    profession: 'python Developer',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/81.jpg',
    dateOfBirth: new Date(),
    bio: 'All About me',
  },
  {
    id: '7',
    firstName: 'Hubert',
    lastName: 'Langhorne',
    email: 'hlanghorne6@thetimes.co.uk',
    gender: 'male',
    profession: 'CPA Marketer',
    image: 'https://randomuser.me/api/portraits/men/80.jpg',
    dateOfBirth: new Date(),
    bio: 'All About me',
  },
]

export const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactsReducer, initialContacts)

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  const updateContact = (contactToUpdate, id) => {
    dispatch({ type: UPDATE_CONTACT, payload: { id, contactToUpdate } })
  }

  const addContact = (contact) => {
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  const value = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  }
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  )
}
