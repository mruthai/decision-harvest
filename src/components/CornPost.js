import { DataContext } from "../contexts/DataProvider"
import { useContext, useState } from 'react'
import { useParams } from "react-router-dom"

export default function CornPost(props) {
    console.log(props, 'from cornPost')
    const { deleteCorn, corns } = useContext(DataContext)
    const [data, setData] = useState([])
    
    const handleDelete = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
      };
    

    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th>Stock Value</th>
                        <th>Bushel Amount</th>
                        <th>Corn value</th>
                        <th>Date of Submission</th>
                        <th>Remove Submission</th>
                    </tr>
                </thead>
                <tbody>
                    {corns.map((item) => (
                        <tr key={item.id}>
                            <td>{item.cornStock}</td>
                            <td>{item.cornBushel}</td>
                            <td>{item.cornValue}</td>
                            <td>{item.dateCreated.toDate().toString()}</td>
                            <td><button className="btn" onClick={(e) => handleDelete(deleteCorn(item.id, e))}>Delete Value</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}