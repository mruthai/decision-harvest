import { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { AuthContext } from '../contexts/AuthProvider'

export default function Home() {
    const { user } = useContext(AuthContext)
    return (
        <header className="App-header">
            <h1 className="headers" > Decision Harvest </h1>
            <div >
                <div>
                    {
                        (user.loggedIn)
                    }
                </div>
                    <div>
                        <h3>We build your inner value</h3>
                    </div>
                <div>
                    <p> Decision Harvest creates solutions for small to mid-size farmers. </p>
                </div>
            </div>

        </header>
    )

}