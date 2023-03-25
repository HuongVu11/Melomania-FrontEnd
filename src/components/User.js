import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginForm from './LoginForm'
import NewUserForm from './NewUserForm'
import UserContext from '../context/UserContext';

const URL = 'https://melomania-adh.herokuapp.com'

function User(props) {
  const {isAuth, setCurrentUser, handleToggleLogout} = useContext(UserContext)
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleCreateUser = (userObj) => {
    axios.post(`${URL}/createaccount`, userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        localStorage.setItem('isLoggedIn', true);
        isAuth()
        navigate('/song')
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
        navigate('/song')
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

      {toggleLogin ?
        <LoginForm handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage}/>
        :
        <NewUserForm handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage}/>
      }
      <button onClick={handleToggleForm} className="btn btn-secondary m-1">{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>

    </div>
  )}
  
  export default User