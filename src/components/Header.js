import {Link} from 'react-router-dom'

function Header() {
    return (
        <nav className='nav'>
            <Link to='/'>Melomania</Link>
            <Link to='song/create'>Add new song</Link>
        </nav>
    )
}

export default Header