export default function AgSoy(props) {
    console.log(props, 'from Ag-Soy')
    return (
        <div className="App">
            <div className="history-container">
                <div>
                    <h3>Soybean Value</h3>
                    <div className="history-box">
                        <h4>${props.soy[0]}</h4>
                        <p className="date-text">Date of submission</p>
                        <p className="date-text">{props.soy[1]}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}