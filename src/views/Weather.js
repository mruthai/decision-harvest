import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { AuthContext } from '../contexts/AuthProvider'
import WeatherForm from '../components/WeatherForm'

export default function WeatherSingle() {
    const { login, user, logout } = useContext(AuthContext)
    const { id, uid } = useParams()
    const { getCurrentWeatherData, getWeatherDoc } = useContext(DataContext)
    const [city, setCity] = useState({})
    const [callCity, setCallCity] = ([])
    const [postError, setPostError] = useState(false)
    const [loadingState, setLoadingState] = useState("LOADING")
    const API_KEY_W = process.env.API_KEY_W
    
    useEffect(() => {
        async function handleLoad() {
            try {
                const data = await getWeatherDoc(uid, id)
                console.log('check weather page is working')
                setCity(data)
                console.log(data, 'hit this weather')
                const zip = data.zip
                const zipData = await getCurrentWeatherData(API_KEY_W, zip)
                setCallCity(zipData)
                setLoadingState("LOADED")
            } catch (err) {
                setPostError(true)
            }
        }

       
       if (user.loggedIn) {
           handleLoad()

       }
    }, [uid, id])

    return (
        <div className="App">
            <div>
                <h1>Weather</h1>
                <WeatherForm/>
            </div>

            {(loadingState === "LOADING") ?
                    <p>Loading...</p> : 
                    <div>
                      
                        {city.zip}
                       
                        </div>
            }

            {postError ? <>
                    <h2> 404 Data Not Found </h2>
                </> : <></>
            }
        </div>
    )
}