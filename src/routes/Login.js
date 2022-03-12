import { signInWithGoogle } from '../auth/Firebase.js'

import {useNavigate} from 'react-router-dom'; 

import { Container } from '@mui/material'
import GoogleButton from 'react-google-button'

function Login() {

  let navigate = useNavigate();
  const authHandle=()=>{
    signInWithGoogle()
    .then(result=>{
      navigate('/dashboard',{state:{name:result.user.displayName,photoURL:result.user.photoURL}}) ; 
    })
    .catch(err=>console.log(err))
  }

  return (
    <Container style={{
      width:'100%',
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    }}>
      <GoogleButton 
      
      onClick={authHandle}/>
    </Container>
  )
}

export default Login