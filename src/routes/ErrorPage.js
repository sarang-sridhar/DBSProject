import React from 'react';
import notFound from '../assets/NotFoundImg/notFound.png';
function ErrorPage() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}>
      <img
        style={{
          height: '100%',
          width: '100%'
        }}
        src={notFound}
        alt="not found"
      />
    </div>
  );
}

export default ErrorPage;
