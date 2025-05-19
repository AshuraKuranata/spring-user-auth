import { useNavigate } from "react-router"
import { useEffect } from "react"

const Logout = ({user, setUser}) => {
    
    const navigate = useNavigate() 

    useEffect(() => {
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