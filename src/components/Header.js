import {Link} from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function Header() {
    const { isAuthenticated, handleLogout} = useContext(UserContext)
    return (
        <>
            {isAuthenticated ?
                <nav>
                    <Link to='/'>Melomania</Link>
                    <Link to='/song'>Songs</Link>
                    <Link to='/song/create'>Add new</Link>
                    <Link onClick={handleLogout}>Logout</Link>
                </nav>
                :
                <nav>
                    <Link to='/'>Melomania</Link>
                    <Link to='/artist'>
                        Artists
                    </Link>
                    <Link to='/song'>Songs</Link>
                    <Link to='/user'>Sign in</Link>
                </nav>
            }
        </>
    )
}

export default Header