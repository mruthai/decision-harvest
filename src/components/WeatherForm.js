import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function WeatherForm() {
    const [zip, setZip] = useState('')
    const { addCity } = useContext(DataContext)
   
    async function handleSubmit(e) {
        e.preventDefault()
        const newCity = await addCity(zip)  // state
        console.log(newCity)
        setZip('')

    }

    return (
        <div>
            <form className="search-box" onSubmit={handleSubmit}>
                <div className="search">
                    <input placeholder="add your zip code"
                        type="text" name="city" 
                        id="city" 
                        onChange={(e) => setZip(e.target.value)} 
                        value={zip} />
                    {/* <input placeholder="add your city"
                        type="text" name="city" 
                        id="city" 
                        onChange={(e) => setCity(e.target.value)} 
                        value={city} /> */}

                </div>
                <div>
                    <button className="search-btn"> Add City</button>
                </div>
            </form>
            

        </div>
    )
}