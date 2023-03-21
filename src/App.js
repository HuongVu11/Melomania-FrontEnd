import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import UserContext from './context/UserContext';
import { useState } from 'react';

function App() {
  
  const [currentUser, setCurrentUser] = useState({})
  const [toggleLogout, setToggleLogout] = useState(false)
  const [isAuthenticated, setIsAuthenticated]=useState(false)
  
  const isAuth = () => {
    setIsAuthenticated(true)
  }
  const notAuth = () => {
    setIsAuthenticated(false)
  }

  const handleLogout = () => {
    notAuth()
    setCurrentUser({})
    handleToggleLogout()
  }

  const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }

  return (

    <UserContext.Provider value={{isAuthenticated, isAuth, notAuth, currentUser, setCurrentUser, toggleLogout, handleLogout, handleToggleLogout}}>
      <div className="App">
        <Header currentUser={currentUser} handleLogout={handleLogout}/>
        <Main currentUser={currentUser} handleLogout={handleLogout} />
      </div>
    </UserContext.Provider>

  )
}

export default App