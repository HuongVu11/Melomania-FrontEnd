import {Link} from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function Header() {
    const { isAuthenticated, handleLogout} = useContext(UserContext)

    //Toggle between adding and removing the "responsive" class to navBar when the user clicks on the icon
    const responsiveNav = () => {
        const x = document.getElementById("responsiveNav");
        if (x.className === "navBar") {
            x.className += " responsive";
        } else {
            x.className = "navBar";
        }
    }

    return (
        <>
            {isAuthenticated ?
                <nav className="navBar" id="responsiveNav">
                    <Link className="homeLink" to='/'>Melomania</Link>
                    <Link to='/artist'>Artists</Link>
                    <Link to='/song'>Songs</Link>
                    <Link to='/song/create'>Add new</Link>
                    <Link className='split' onClick={handleLogout}>Logout</Link>
                    <Link to="" className="icon" onClick={responsiveNav}>
                        <i className="fa fa-bars"></i>
                    </Link>
                </nav>
                :
                <nav className="navBar" id="responsiveNav">
                    <Link className="homeLink" to='/'>Melomania</Link>
                    <Link to='/artist'>Artists</Link>
                    <Link to='/song'>Songs</Link>
                    <Link className='split' to='/user'>Sign in</Link>
                    <Link to="" className="icon" onClick={responsiveNav}>
                        <i className="fa fa-bars"></i>
                    </Link>
                </nav>
            }
        </>
    )
}

export default Header