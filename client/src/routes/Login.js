import { signInWithGoogle } from '../auth/Firebase.js';

import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import GoogleButton from 'react-google-button';

import { useDispatch } from 'react-redux';
import { isAuth } from '../redux/actions/index.js';

import axios from '../axios-study.js';

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const authHandle = () => {
    signInWithGoogle()
      .then((result) => {
        var data = {
          name: result.user.displayName,
          uid: result.user.uid,
          email: result.user.email
        };
        axios
          .post('/login', data)
          .then((response) => {
            sessionStorage.setItem('user', response.data.name);
            console.log(response);
            navigate('/dashboard', {
              state: {
                name: response.data.name,
                email: response.data.email,
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
        alignItems: 'center'
      }}>
      <GoogleButton onClick={authHandle} />
    </Container>
  );
}

export default Login;
