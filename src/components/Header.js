import {Link} from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function Header() {
    //const {isAuthenticated, isAuth, notAuth, currentUser, toggleLogout, handleLogout, handleToggleLogout} = useContext(UserContext)
    const { currentUser, handleLogout} = useContext(UserContext)
    //console.log(currentUser)
    return (
        <>
            {currentUser.username ?
                <nav>
                    <Link to='/'>Melomania</Link>
                    <Link to='/song'>Songs</Link>
                    <Link to='/song/create'>Add new</Link>
                    <Link onClick={handleLogout}>Logout</Link>
                </nav>
                :
                <nav>
                    <Link to='/'>Melomania</Link>
                    <Link to='/song'>Songs</Link>
                    <Link to='/user'>Sign in</Link>
                </nav>
            }
        </>
    )
}

export default Header