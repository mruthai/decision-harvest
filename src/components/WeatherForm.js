import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function WeatherForm() {
    const [zip, setZip] = useState('')
    const { addZip } = useContext(DataContext)

    async function handleSubmit(e) {
        e.preventDefault()
        const newZip = await addZip(zip)  // state
        console.log(newZip)
        setZip('')

    }

    return (
        <div>
            <form className="search-box" onSubmit={handleSubmit}>
                <div className="search">
                    <input placeholder="add your zip code"
                        type="text" name="city"
                        id="zip"
                        onChange={(e) => setZip(e.target.value)}
                        value={zip} />
                </div>
                <div>
                    <button className="search-btn"> Add City</button>
                </div>
            </form>


        </div>
    )
}