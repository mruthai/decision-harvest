
export default function AgPost(props) {
    console.log(props, 'from ag-post')
    return (
        <div className="App">
            <div className="history-container">
                <div className="history-sub-container">
                    <div className="history-box">
                        <h3>Corn Value</h3>
                        <h3>${props.corn[0]}</h3>
                        <p className="date-text">Date of submission</p>
                        <p className="date-text">{props.corn[1]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}