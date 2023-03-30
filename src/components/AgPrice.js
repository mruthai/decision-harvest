import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { useParams } from 'react-router-dom'

export default function AgPrice() {
    const { getStockData, addCorn, corn, addSoybeans, soybeans } = useContext(DataContext)
    const [futures, setFutures] = useState({})
    const [loadingState, setLoadingState] = useState("LOADING")
    const [postError, setPostError] = useState(false)
    const [myCorn, setMyCorn] = useState('')
    const [mySoybeans, setMySoybeans] = useState('')
    const { id, uid } = useParams()
    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        async function handleLoad() {
            try {
                const data = await getStockData(API_KEY)
                setFutures(data)
                console.log(data)
                setLoadingState("LOADED")
            } catch (err) {
                setPostError(true)
            }
        }
        handleLoad()
    }, [])

    // useEffect(() => {
    //     async function handleLoad() {
    //         try {
    //             const data = await showCorn(id, uid)
    //             setResultCorn(data)
    //             console.log(data)
    //             setLoadingState("LOADED")
    //         } catch (err) {
    //             setPostError(true)
    //         }
    //     }

    //     handleLoad()
    // }, [id,uid])



    // capture corn value of user input
    async function handleSubmit(e) {
        e.preventDefault()
        const newCorn = await addCorn((Math.round(100 * (1 / futures.data.rates.CORN)) / 100) * myCorn)
        setMyCorn('')
        console.log(newCorn)
    }
    //capture soybean return value of user input
    async function handleSubmitSoy(e) {
        e.preventDefault()
        const newSoybeans = await addSoybeans((Math.round(100 * (1 / futures.data.rates.SOYBEAN)) / 100) * mySoybeans)
        setMySoybeans('')
        console.log(newSoybeans)
    }

    return (
        <div className="App">

            {
                (loadingState === "LOADING") ?
                    <p>Loading...</p> :
                    <div>
                        <h2 className="table-title">Current Market Commodity Price</h2>

                        <div className="table-container">
                            <table className="table-c">
                                <thead>
                                    <tr>
                                        <th>Commodity Type</th>
                                        <th>Current Market Value</th>
                                        <th>Units</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="stock-valueA">Corn</td>
                                        <td className="stock-valueB">${Math.round(100 * (1 / futures.data.rates.CORN)) / 100}</td>
                                        <td className="stock-valueC">Per Bushel</td>
                                    </tr>
                                    <tr>
                                        <td className="stock-valueA">Soybean</td>
                                        <td className="stock-valueB">${Math.round(100 * (1 / futures.data.rates.SOYBEAN)) / 100}</td>
                                        <td className="stock-valueC">Per Bushel</td>
                                    </tr>
                                    <tr>
                                        <td className="stock-valueA">Lean Hog</td>
                                        <td className="stock-valueB">${Math.round(100 * (1 / futures.data.rates.LHOG)) / 100}</td>
                                        <td className="stock-valueC">Per lb</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* <p>Petrolum: $ {Math.round(100 * (1 / futures.rates.WTIOIL)) / 100 } Per barrel</p>
                        <p>Fuel: $ {Math.round(100 * (1 / futures.rates.RBU22)) / 100 } Per gallon</p>  */}
                        <div className="calculation-container">
                            <div className="search-box" >
                                <form onSubmit={handleSubmit}>
                                    <div className="search">
                                        <h3> Calculate Value of Corn</h3>
                                        <div>
                                            <input placeholder="Current Amount of Corn Bushels"
                                                type="number" className="search-input" name="corn"
                                                id="corn"
                                                onChange={(e) => setMyCorn(e.target.value)}
                                                value={myCorn} />
                                        </div>
                                        <div>
                                            <button className="search-btn"> Calculate Value</button>
                                        </div>
                                    </div>
                                </form>
                                <div>
                                    <div className="value-box">
                                        {corn.length ? <h4>${corn[0].corns} </h4> : <p> No data</p>}
                                        {corn.length ? <p className="date-text" > {corn[0].dateCreated.toDate().toString()}</p> : <p>No Data</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="search-box">
                                <form onSubmit={handleSubmitSoy}>
                                    <div className="search">
                                        <h3> Calculate Value of Soybeans</h3>
                                        <div>
                                            <input placeholder="Current Amount of Soybeans Bushels"
                                                type="number" className="search-input" name="soybeans"
                                                id="soybeans"
                                                onChange={(e) => setMySoybeans(parseInt(e.target.value))}
                                                value={mySoybeans} />
                                        </div>
                                        <div>
                                            <button className="search-btn"> Calculate Value</button>
                                        </div>
                                    </div>
                                </form>
                                <div>
                                    <div className="value-box">
                                        {soybeans.length ? <h4>${soybeans[0].soybean} </h4> : <p> No data</p>}
                                        {soybeans.length ? <p className="date-text" > {soybeans[0].dateCreated.toDate().toString()}</p> : <p>No data</p>}
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

            }
            {postError ?
                <>
                    <h2> 404 </h2>
                    <p> could not be found</p>
                </> :
                <></>
            }

        </div>
    )

}

