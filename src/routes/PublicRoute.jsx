import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import { Navigate, useLocation } from 'react-router-dom'

function PublicRoute({ children }) {
  const { user } = useContext(AuthContext)
  const location = useLocation()
  const loadedComp = user ? <Navigate to='/contacts' /> : children

  return <div>{loadedComp}</div>
}

export default PublicRoute
