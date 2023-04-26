import { DataContext } from "../contexts/DataProvider"
import { useContext } from 'react'
import { useParams } from "react-router-dom"

export default function AgPost(props, cornValue) {
    console.log(props, 'from ag-post')
    const { deleteCorn } = useContext(DataContext)
    
    return (
        <div className="App">
            <div className="history-container">
                <div className="history-sub-container">
                    <div className="history-box">
                        <h3>Corn Value</h3>
                        <h3>${props.corns[0]}</h3>
                        <p className="date-text">Month Stock Value: ${props.corns[2]}</p>
                        <p className="date-text">Bushels amount: {props.corns[3]}</p>
                        <p className="date-text">Date of submission</p>
                        <p className="date-text">{props.corns[1]}</p>
                        <button className="btn" onClick={() => deleteCorn(props.corns.uid, props.corns.id)}>Delete Value</button>
                    </div>
                </div>
            </div>
        </div>
    )
}