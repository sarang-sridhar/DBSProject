import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

function ProtectedRoute({authState}) {
  return authState?<Outlet/>:<Navigate to="/"/>
}

export default ProtectedRoute