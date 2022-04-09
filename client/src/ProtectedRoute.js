import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ authState }) {
  return authState ? <Outlet /> : <Navigate to="/" />;
}

ProtectedRoute.propTypes = {
  authState: PropTypes.bool
};

export default ProtectedRoute;
