import AgSoy from "../components/AgSoy"

import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { DataContext } from '../contexts/DataProvider'

export default function Soybeans() {
    const { user } = useContext(AuthContext)
    const { soybeans } = useContext(DataContext)
    console.log(soybeans, "checking for beans")
    
    return (
        <header className="App-header">
            <h1> Soybeans History Value </h1>
            <img src="./images/soybean.png" alt="" /> 
            {
                (user.loggedIn)
            }
            <div>
                 {/* {soybeans.map((soy)=> <AgSoy soy={soy} key={soy.id}/> )} */}
                 { soybeans.map((soy)=> <AgSoy soy={[ soy.soybean, soy.dateCreated.toDate().toString()]} key={soy.id}/> )}
            </div>
            <div>
           
            </div>
        </header>
    )
    
}

