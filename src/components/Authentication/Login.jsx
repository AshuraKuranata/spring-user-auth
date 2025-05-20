import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = ({user, setUser}) => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [checkUser, setCheckUser] = useState({
        username: '',
        password: '',
    })

    // Old Route - confirming through a check against pulled data (without Bcrypt hashing)
    // const [allUsers, setAllUsers] = useState([])

    // useEffect(() => {
    //     async function fetchData() {
    //     try {
    //         const res = await fetch("http://localhost:8080/auth/users");
    //         if (!res.ok) throw new Error("Network response was not ok");
    //         const data = await res.json();
    //         setAllUsers(data);
    //     } catch (error) {
    //         console.error("Fetch failed:", error);
    //     }
    //     }
    //     fetchData();
    // }, []);

    const handleChange = (event) => {
        event.preventDefault()
        setCheckUser({...checkUser, [event.target.name]: event.target.value})
    }

    // With Bcrypt hashing
    const loginUser = async (event) => {
        event.preventDefault()
        setError(null)
        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkUser)
            });

            const result = await res.json();

            if (result.message === "Login Successful!") {
                document.cookie = "username=" + checkUser.username
                setUser({...user, username: checkUser.username});
                setCheckUser({username: '', password: ''});
                navigate('/');
            }
            else{
                throw new Error(result.message);
            }
        } catch(error){
            setError(error.message);
        }
    }

    // Previous Log-in Route without Bcrypt Hashing
    // const loginUser = async (event) => {
    //     event.preventDefault()
    //     try {
    //         const foundUser = allUsers.find(user => user.username === checkUser.username);

    //         if (!foundUser) {
    //             throw new Error('Incorrect credientials, please try again.')
    //         }

    //         else if (foundUser.password !== checkUser.password) {
    //             throw new Error('Incorrect credientials, please try again.')
    //         }

    //         else {
    //             setUser( {...user, username: checkUser.username} )
    //             setCheckUser({
    //                 username: '',
    //                 password: '',
    //             })
    //             navigate('/')
    //         }
    //     } catch(error){
    //         setError(error.message);
    //     }
    // }

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