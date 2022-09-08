import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import qs from 'qs'

import { axiosPrivateInstance } from '../config/axios'
import { formateContact } from '../utils/formatContact'

import { AuthContext } from './Auth.Context'

import contactsReducer from './reducer'
import {
  DELETE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  LOAD_CONTACTS,
} from './types'

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
  const [loaded, setLoaded] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(null)
  const [trigger, setTrigger] = useState(false)
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      ;(async () => {
        await loadContacts()
      })()
    }
  }, [token, pageNumber, trigger])

  const loadContacts = async () => {
    const query = qs.stringify(
      {
        sort: ['id:desc'],
        populate: '*',
        pagination: {
          page: pageNumber,
          pageSize: import.meta.env.VITE_PAGE_SIZE,
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
    try {
      const response = await axiosPrivateInstance(token).get(
        `/contacts?${query}`
      )
      const loadedContacts = response.data.data.map((contact) =>
        formateContact(contact)
      )
      console.log(response.data)
      dispatch({ type: LOAD_CONTACTS, payload: loadedContacts })
      //set page count in state
      setPageCount(response.data.meta.pagination.pageCount)
      setLoaded(true)
    } catch (err) {
      setLoaded(true)
      console.log(err.response)
    }
  }

  const deleteContact = async (id) => {
    try {
      const response = await axiosPrivateInstance(token).delete(
        `/contacts/${id}`
      )
      dispatch({ type: DELETE_CONTACT, payload: response.data.data.id })
      //triggering delete event
      setTrigger(!trigger)
      //show toast message
      toast.success('Contact is deleted successfully')
      //navigate
      // navigate('/contacts')
    } catch (err) {
      toast.error(err.response?.data?.error?.message)
      console.log(err.response)
    }
  }

  const updateContact = async (contactToUpdate, id) => {
    try {
      //send request to the server
      //successful response
      const response = await axiosPrivateInstance(token).put(
        `/contacts/${id}?populate=*`,
        {
          data: contactToUpdate,
        }
      )

      const contact = formateContact(response.data.data)
      //dispatch here
      dispatch({ type: UPDATE_CONTACT, payload: { id: contact.id, contact } })

      //toast message
      toast.success('contact is updated Successfully')
      //redirect to contacts
      navigate(`/contacts/${contact.id}`)
    } catch (err) {
      toast.error(err.response?.data?.error?.message)
    }
  }

  const addContact = async (contactData) => {
    try {
      const response = await axiosPrivateInstance(token).post(
        '/contacts?populate=*',
        {
          data: contactData,
        }
      )

      const contact = formateContact(response.data.data)
      //dispatch here
      dispatch({ type: ADD_CONTACT, payload: contact })
      //triggering add contact event
      setTrigger(!trigger)
      //toast message
      toast.success('contact is Added Successfully')
      //redirect to contacts
      navigate('/contacts')
    } catch (err) {
      toast.error(err.response?.data?.error?.message)
    }
  }

  const value = {
    loaded,
    contacts,
    addContact,
    updateContact,
    deleteContact,
    pageCount,
    pageNumber,
    setPageNumber,
  }
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  )
}
