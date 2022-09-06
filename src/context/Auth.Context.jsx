import { createContext, useState, useEffect } from 'react'
import { axiosPrivateInstance, axiosPublicInstance } from '../config/axios'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import qs from 'qs'
import { formateContact } from '../utils/formatContact'
export const AuthContext = createContext()
const loadedUser = JSON.parse(localStorage.getItem('user'))
const loadedToken = JSON.parse(localStorage.getItem('token'))

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadedUser ? loadedUser : null)
  const [profileId, setProfileId] = useState(null)
  const [triggerDelete, setTriggerDelete] = useState(false)
  const [userContacts, setUserContacts] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [token, setToken] = useState(loadedToken ? loadedToken : null)
  const navigate = useNavigate()
  const location = useLocation()
  const registerUser = async (data) => {
    try {
      const response = await axiosPublicInstance.post(
        '/auth/local/register',
        data
      )

      const { user, jwt } = response.data
      //setting data to the localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', JSON.stringify(jwt))
      //update state
      setUser(user)
      setToken(jwt)

      toast.success('Register successfully redirecting...')

      //Redirecting the user
      navigate('/contacts')
    } catch (err) {
      toast.error(err.response?.data?.error?.message)
    }
  }

  //load user profile
  useEffect(() => {
    if (token && loaded) {
      ;(async () => {
        await loadUserProfile()
      })()
    }
  }, [token, loaded])

  //load user
  useEffect(() => {
    if (token) {
      ;(async () => {
        await loadUserContact()
      })()
    }
  }, [token, triggerDelete])

  const loadUserProfile = async () => {
    const query = qs.stringify(
      {
        populate: ['profilePicture', 'user', 'user.contacts'],
      },
      {
        encodeValuesOnly: true,
      }
    )
    try {
      const response = await axiosPrivateInstance(token).get(
        `/profiles/${profileId}?${query}`
      )
      const mappedContacts =
        response.data.data.attributes.user.data.attributes.contacts.data.map(
          (contact) => formateContact(contact)
        )
      console.log(response.data)
      setUserContacts(mappedContacts)
      setLoaded(true)
    } catch (err) {
      console.log(err.response)
      console.log(err)
      setLoaded(true)
    }
  }

  const loadUserContact = async () => {
    const query = qs.stringify(
      {
        populate: ['profile', 'profile.profilePicture', 'contacts'],
      },
      {
        encodeValuesOnly: true,
      }
    )
    try {
      const response = await axiosPrivateInstance(token).get(
        `/users/me?${query}`
      )
      console.log(response.data)
      setProfileId(response.data.profile.id)
      setLoaded(true)
    } catch (err) {
      console.log(err.response)
      setLoaded(true)
    }
  }

  const login = async (data) => {
    try {
      const response = await axiosPublicInstance.post('/auth/local/', data)

      const { user, jwt } = response.data
      //setting data to the localStorage
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', JSON.stringify(jwt))
      //update state
      setUser(user)
      setToken(jwt)

      toast.success('Login successfully redirecting...')

      //Redirecting the user
      navigate(location?.state?.from ? location?.state?.from : '/contacts')
    } catch (err) {
      toast.error(err.response?.data?.error?.message)
    }
  }

  const logout = () => {
    //remove data from localStorage

    localStorage.removeItem('user')
    localStorage.removeItem('token')

    //remove data from state
    setUser(null)
    setToken(null)
    toast.success('Logout successful rdirecting...')
    navigate('/')
  }

  const value = {
    setTriggerDelete,
    userContacts,
    loaded,
    registerUser,
    login,
    logout,
    user,
    token,
    profileId,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
