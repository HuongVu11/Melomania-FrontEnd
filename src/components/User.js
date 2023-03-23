import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import LoginForm from './LoginForm'
import NewUserForm from './NewUserForm'
import UserContext from '../context/UserContext';

const URL = 'https://melomania-adh.herokuapp.com'

function User(props) {
  const {isAuth, isAuthenticated, setCurrentUser, toggleLogout, handleToggleLogout} = useContext(UserContext)
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleCreateUser = (userObj) => {
    axios.post(`${URL}/createaccount`, userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        localStorage.setItem('isLoggedIn', true);
        isAuth()
        handleToggleLogout()
      } else {
        setErrorMessage(response.data)
        setToggleError(true)
      }
    })
  }

  const handleLogin = (userObj) => {
    //console.log(userObj);
    axios.put(`${URL}/login`, userObj).then((response) => {
      if(response.data.username){
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        localStorage.setItem('isLoggedIn', true);
        isAuth()
        handleToggleLogout()
      } else {
        console.log(response);
        setToggleError(true)
        setErrorMessage(response.data)
      }
    })
  }

  const handleToggleForm = () => {
    setToggleError(false)
    if(toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogin(true)
    }
  }

  return (
    <div className="container">

      <div>
        {toggleLogout ?
          // Move Logout button to Nav
          // <button onClick={handleLogout} className='logoutBtn'>Logout</button> :
          null:
          <div className='container'>
            {toggleLogin ?
            <LoginForm handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage}/>
            :
            <NewUserForm handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage}/>
            }
            <button onClick={handleToggleForm} className="btn btn-secondary m-1">{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
          </div>
        }
      </div>

      {isAuthenticated ? <Navigate to='/song' /> : null}


    </div>
  )}
  
  export default User