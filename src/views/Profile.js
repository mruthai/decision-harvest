import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
// import { DataContext } from '../contexts/DataProvider'
import { AuthContext } from '../contexts/AuthProvider'
import AgPrice from '../components/AgPrice'
// import AgPost from '../components/AgPost'

export default function Profile() {
    const { login, user, logout } = useContext(AuthContext)

    return (
        <div className ="App-header">
            {
                (user.loggedIn)
            }
            <h1>Assisting your farm decisions</h1>
            <div>
                <AgPrice />
           
            </div>

        </div>


    )

}