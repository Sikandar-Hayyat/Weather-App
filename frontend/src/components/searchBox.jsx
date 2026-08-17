function SearchBox({
  city,
  setCity,
  getWeather,
  loading
}) {
  return (
    <div className="search-controls">
      <input
        type="text"
        placeholder="Enter City..."
        value={city}
        onChange={(event) => setCity(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            getWeather();
          }
        }}
      />

      <button onClick={getWeather} disabled={loading}>
        {loading ? "Searching" : "Search"}
      </button>
    </div>
  );
}

export default SearchBox;