import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext)
  const location = useLocation()
  const loadedComp = user ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location.pathname }} />
  )
  return <div>{loadedComp}</div>
}

export default PrivateRoute
