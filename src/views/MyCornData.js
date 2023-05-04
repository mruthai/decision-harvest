import AgPost from "../components/CornPost"



import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { DataContext } from '../contexts/DataProvider'

export default function Commodities() {
    const { user } = useContext(AuthContext)
    const { corns } = useContext(DataContext)
    
    
    return (
        <header className="App-header">
            <h1> Corn History Value</h1>
            
            <img src="./images/corn.png" alt="" /> 
            {
                (user.loggedIn)
            }
            <div>
            {corns.map((c) => <AgPost corns={[c.cornBushel, c.cornStock, c.cornValue, c.dateCreated.toDate().toString()]} key={c.id}/>)}
            
            </div>
            
        </header>
    )
    
}





// THIS CODE CALLS THE API OVER AND OVER AGAIN
