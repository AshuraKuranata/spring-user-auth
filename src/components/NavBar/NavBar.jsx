import { Link } from 'react-router'

function NavBar({user}) {
    return(
        <nav className='flex justify-evenly'>
            <Link to='/' >Home</Link>
            {!user.username ? 
            <>
                <Link to='/login' >Log In</Link>
                <Link to='/signup' >Sign Up</Link>
            </>
            :
            <>
                <Link to='/users' >Users</Link>
                <Link to='/logout' >Log Out</Link>
            </>
            }
            
            
            
        </nav>
    )
}

export default NavBar