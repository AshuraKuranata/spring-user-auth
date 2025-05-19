import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = ({user, setUser}) => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [checkUser, setCheckUser] = useState({
        username: '',
        password: '',
    })
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        async function fetchData() {
        try {
            const res = await fetch("http://localhost:8080/auth/users");
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json(); // <- FIXED: Await this
            setAllUsers(data);
        } catch (error) {
            console.error("Fetch failed:", error);
        }
        }
        fetchData();
    }, []);

    const handleChange = (event) => {
        event.preventDefault()
        setCheckUser({...checkUser, [event.target.name]: event.target.value})
    }

    const loginUser = async (event) => {
        event.preventDefault()
        try {
            const foundUser = allUsers.find(user => user.username === checkUser.username);

            if (!foundUser) {
                throw new Error('Incorrect credientials, please try again.')
            }

            else if (foundUser.password !== checkUser.password) {
                throw new Error('Incorrect credientials, please try again.')
            }

            else {
                setUser( {...user, username: checkUser.username} )
                setCheckUser({
                    username: '',
                    password: '',
                })
                navigate('/')
            }
        } catch(error){
            setError(error.message);
        }
        
        
    }

    return (
        <>
        <h1>Sign-up</h1>
        <form>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" required value={checkUser.username} onChange={handleChange}></input>
            <label htmlFor="password">Password: </label>
            <input type='password' name='password' required autoComplete='false' value={checkUser.password} onChange={handleChange}></input>
            <button onClick={loginUser}>Login</button>
            
            {error && (
                <div>
                    Error: {error}
                </div>
            )}
        </form>
        </>
    )
}

export default Login