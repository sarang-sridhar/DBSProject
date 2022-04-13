import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  return sessionStorage.getItem('uid') ? <Outlet /> : <Navigate to="/" />;
}

ProtectedRoute.propTypes = {
  authState: PropTypes.bool
};

export default ProtectedRoute;
