import ApplicationContext from "../context/ApplicationContext";
import { useContext } from "react";


const Homepage = () => {

    const { loggedUser} = useContext(ApplicationContext);
    return (
        <h1>Welcome {loggedUser.firstname}</h1>
    )
}

export default Homepage;