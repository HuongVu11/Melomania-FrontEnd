import React, { useState } from 'react'

function App(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const triggerLogin = (event) => {
    event.preventDefault()
    let userObj = {
      username: username,
      password: password
    }
    props.handleLogin(userObj)
  }


  return (
    <div className="container">
      <h1 className='formTitle'>Login</h1>
      <form onSubmit={triggerLogin} className='inputForm'>
        <input type='text' placeholder='username' className='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
        <input type='password' placeholder='password' className='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
        {props.toggleError ?
          <h5 className='errorMsg'>{props.errorMessage}</h5>
          :
          null
        }
        <input type='submit' value='Login' className="submitBtn"/>
      </form>
    </div>
  );
}

export default App;
