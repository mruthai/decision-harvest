import AgPost from "../components/AgPost"



import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { DataContext } from '../contexts/DataProvider'

export default function Commodities() {
    const { user } = useContext(AuthContext)
    const { corn } = useContext(DataContext)
    
    
    return (
        <header className="history">
            <h1> Corn History Value</h1>
            
            <img src="./images/corn.png" alt="" /> 
            {
                (user.loggedIn)
            }
            <div className="history-main-container">
            {corn.map((c) => <AgPost corn={[c.corns, c.dateCreated.toDate().toString()]} key={c.id}/>)}
            </div>
            
        </header>
    )
    
}





// THIS CODE CALLS THE API OVER AND OVER AGAIN
