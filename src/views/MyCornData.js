import CornPost from "../components/CornPost"
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'


export default function MyCornData() {
    const { user } = useContext(AuthContext)
    return (
        <header className="App-header">
            <h1> Corn History Value</h1>
            
            <img src="./images/corn.png" alt="" /> 
            {
                (user.loggedIn)
            }
            <div>
            <CornPost/>
            </div>
            
        </header>
    )
    
}






