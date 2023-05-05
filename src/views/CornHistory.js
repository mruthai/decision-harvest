import HistoryCorn from '../components/HistoryCorn'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'


export default function Profile() {
    const { login, user, logout } = useContext(AuthContext)

    return (
        <div className ="App-header">
            <h1>Assisting your farm decisions</h1>
            <div>
            {
                (user.loggedIn)
            }
                 <HistoryCorn/>
                
            </div>

        </div>


    )

}