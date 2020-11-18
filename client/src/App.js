import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import useAsync from "./hooks/useAsync";

function App() {
  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword("facebook")
  );

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <label>Password for...
            <input type="submit" value="password" />
          </label>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {data}
      </header>
    </div>
  );
}

export default App;
