import style from './Login.module.scss'
import { useState } from 'react';
import { logIn } from '../../redux/actions';

//COMPONENTES
import {TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const Login = ()=>{
      const dispatch = useDispatch()
      const navigate = useNavigate();
      const [user, setUser] = useState({
            email : '',
            password : '',
      });

      const handlerSubmit = event =>{
            event.preventDefault()
            dispatch( logIn(user.email, user.password, navigate) );
      };

      const handlerChange = event =>{
            setUser({
                  ...user,
                  [event.target.name] : event.target.value
            });
      };

      return (
            <div>
                  <form onSubmit={ handlerSubmit } className={style.container}>
                        <TextField 
                              type='email'
                              name='email'
                              label='Email'
                              onChange={handlerChange}
                        />

                        <TextField 
                              type='password' 
                              name='password'
                              label='Password'
                              onChange={handlerChange}
                        />

                        <Button 
                              type='submit' 
                              variant='contained'
                        >
                              Submit
                        </Button>
                  </form>
            </div>
      );
}
export default Login;