function HistoryTable({ history }) {
  return (
    <div className="history-results">
      <h2>Historical Weather</h2>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Condition</th>
            </tr>
          </thead>

          <tbody>
            {history.map((record) => (
              <tr key={new Date(record.date).getTime()}>
                <td>{new Date(record.date).toLocaleString()}</td>
                <td>{record.averageTemperature.toFixed(1)}°C</td>
                <td>{record.averageHumidity.toFixed(1)}%</td>
                <td>{record.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;