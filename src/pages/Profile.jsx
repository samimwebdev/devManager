import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'

function Profile() {
  const { user } = useContext(AuthContext)
  const { username, email } = user
  return (
    <>
      <h2>Profile Info</h2>
      <p>
        username : <em>{username}</em>
      </p>
      <p>
        email : <em>{email}</em>
      </p>
    </>
  )
}

export default Profile
