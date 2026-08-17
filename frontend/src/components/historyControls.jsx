function HistoryControls({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  getHistory,
  historyLoading
}) {
  return (
    <div className="history-controls">
      <h2>Weather History</h2>

      <div className="date-controls">
        <div>
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(event) => setFromDate(event.target.value)}
          />
        </div>

        <div>
          <label>To:</label>
          <input
            type="date"
            value={toDate}
            min={fromDate}
            onChange={(event) => setToDate(event.target.value)}
          />
        </div>

        <button onClick={getHistory} disabled={historyLoading}>
          {historyLoading ? "Loading..." : "Get History"}
        </button>
      </div>
    </div>
  );
}

export default HistoryControls;