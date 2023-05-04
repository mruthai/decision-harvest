import {  useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import AgPrice from '../components/AgPrice'
import HistoryCorn from '../components/HistoryCorn'


export default function Profile() {
    const { login, user, logout } = useContext(AuthContext)

    return (
        <div className ="App-header">
            <h1>Assisting your farm decisions</h1>
            <div>
            {
                (user.loggedIn)
            }
                <AgPrice />
                <HistoryCorn/>
            </div>

        </div>


    )

}