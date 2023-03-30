import { useState, useEffect, createContext } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from '@firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = function(props) {
    const [userId, setUserId] = useState([])
    const [user, setUser] = useState({
        loggedIn: false,
        checked: false
    })
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    async function login() {
        const result = await signInWithPopup(auth, provider)
        
    }

    async function logout() {
        const result = await signOut(auth)
        console.log(result)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (userData) => {
            if (userData) {
                userData.loggedIn = true
                userData.checked = true
                setUserId(userData.uid)
                setUser(userData)
                console.log(userData.uid)
            } else {
                setUser({
                    loggedIn: false,
                    checked: true
                })
            }
        })
    }, [])

    const value = {
        login,
        logout,
        user,
        userId
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}