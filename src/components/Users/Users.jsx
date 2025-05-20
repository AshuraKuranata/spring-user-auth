import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router';


function Users({user, cookieUserCheck}) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!document.cookie.includes(cookieUserCheck)) {
            navigate("/login")
        }
    })
    

    const [allUsers, setAllUsers] = useState([])
    
    useEffect(() => {
        async function fetchData() {
        try {
            const res = await fetch("http://localhost:8080/auth/users");
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();
            setAllUsers(data);
        } catch (error) {
            console.error("Fetch failed:", error);
        }}
        fetchData();
    }, []);

    const deleteUser = async (event) => {
        await fetch(`http://localhost:8080/auth/user/${event}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const res = await fetch("http://localhost:8080/auth/users");
        const refresh = await res.json();
        setAllUsers(refresh);
    }
    return(
        <>
        {allUsers.length === 0 ?
        <div>
            <h1>No Users</h1>
        </div>
        :
        allUsers.map((userlist, idx) => (
            <div key={idx}>
                <h2>{userlist.username}</h2>
                {user.username === userlist.username ?
                <></>
                :
                <button onClick={(() => deleteUser(userlist.username))}>Delete {userlist.username}</button>
                }
                
            </div>
        ))}
        </>
    )
}

export default Users