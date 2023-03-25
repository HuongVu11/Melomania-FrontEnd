import React, { useState } from 'react'

function App(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const triggerCreateUser = (event) => {
    event.preventDefault()
    let userObj = {
      username: username,
      password: password
    }
    props.handleCreateUser(userObj)
  }

  return (
    <div className='ctn'>
      <h1>Create an Account</h1>
      <form className='form' onSubmit={triggerCreateUser}>
        <input type='text' placeholder='username' onChange={(event)=> {setUsername(event.target.value)}}/>
        <input type='password' placeholder='password' onChange={(event)=> {setPassword(event.target.value)}}/>
        {props.toggleError ?
          <h5 className='errorMsg'>{props.errorMessage}</h5>
          :
          null
        }
        <input type='submit' value='Register' className="submitBtn"/>
      </form>
    </div>
  );
}

export default App;
