function Home({user}) {
    return(
    <>
        {(user.username)?
        <h2>Welcome {user.username}</h2>
        :
        <h2>No User Detected</h2>
        }
    </>
    )
}

export default Home