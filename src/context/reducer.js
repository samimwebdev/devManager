import { v4 as uuidv4 } from 'uuid'

const contactsReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case DELETE_CONTACT:
      const updatedContacts = state.filter((contact) => contact.id !== payload)
      return [...updatedContacts]

    case ADD_CONTACT:
      const newContact = {
        id: uuidv4(),
        ...payload,
      }
      return [newContact, ...state]

    case UPDATE_CONTACT:
      const { id, contactToUpdate } = payload
      const contacts = state.map((contact) => {
        if (contact.id === id) {
          //update
          return {
            id,
            ...contactToUpdate,
          }
        } else {
          return contact
        }
      })

      return [...contacts]

    default:
      return state
  }
}

export default contactsReducer
