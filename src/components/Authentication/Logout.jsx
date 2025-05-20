import { useNavigate } from "react-router"
import { useEffect } from "react"

const Logout = ({user, setUser}) => {
    
    const navigate = useNavigate() 

    useEffect(() => {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser({
            username: null,
        })
        navigate("/")
    }, [setUser, navigate])

    return(
        <></>
    )
}

export default Logout