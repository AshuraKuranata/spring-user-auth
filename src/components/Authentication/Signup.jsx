import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = ({user, setUser}) => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirmpassword: '',
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
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }

    const createUser = async (event) => {
        event.preventDefault()
        try {
            if (newUser.password !== newUser.confirmpassword) {
                throw new Error('Passwords do not match, please update and try again.')
            } 
            else if (allUsers.some(user => user.username === newUser.username)) {
                throw new Error('Username already exists, please use a different username.')
            }
            else {
                setNewUser({...newUser, confirmpassword: ''})
                await fetch('http://localhost:8080/auth/user/create',{
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                document.cookie = "username=" + newUser.username
                setError(null)
                setUser( {...user, username: newUser.username} )
                setNewUser({
                    username: '',
                    password: '',
                    confirmpassword: '',
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
            <input type="text" name="username" required autoComplete='false' value={newUser.username} onChange={handleChange}></input>
            <label htmlFor="password">Password: </label>
            <input type='password' name='password' required autoComplete='false' value={newUser.password} onChange={handleChange}></input>
            <label htmlFor="confirmpassword">Confirm Password: </label>
            <input type='password' name="confirmpassword" required autoComplete='false' value={newUser.confirmpassword} onChange={handleChange}></input>
            <button onClick={createUser}>Create User</button>
            
            {error && (
                <div>
                    Error: {error}
                </div>
            )}
        </form>
        </>
    )
}

export default Signup