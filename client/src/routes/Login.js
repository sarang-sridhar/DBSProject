import { signInWithGoogle } from '../auth/Firebase.js';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import GoogleButton from 'react-google-button';
import FadeLoader from 'react-spinners/FadeLoader';
import { useDispatch } from 'react-redux';
import { isAuth } from '../redux/actions/index.js';

import axios from '../axios-study.js';

function Login() {
  let [loading, setLoading] = React.useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const authHandle = () => {
    signInWithGoogle()
      .then((result) => {
        setLoading(true);

        var data = {
          name: result.user.displayName,
          uid: result.user.uid
        };
        axios
          .post('/login', data)
          .then((response) => {
            setLoading(false);
            sessionStorage.setItem('user', response.data.name);
            sessionStorage.setItem('uid', response.data.uid);
            console.log(response);
            navigate('/dashboard', {
              state: {
                name: response.data.name,
                uid: response.data.uid,
                balance: response.data.balance,
                photoURL: result.user.photoURL
              }
            });
          })
          .catch((error) => console.log(error));
        console.log(result);
        dispatch(isAuth());
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: loading ? '0.5' : '1'
      }}>
      <GoogleButton onClick={authHandle} />
      <FadeLoader
        color={'blue'}
        loading={loading}
        size={350}
        css={{ position: 'absolute', left: '50%', top: '50%' }}
      />
    </Container>
  );
}

export default Login;
