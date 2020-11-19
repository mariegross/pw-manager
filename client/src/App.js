import { useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import useAsync from "./hooks/useAsync";

function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const { data, loading, error, doFetch } = useAsync(() => getPassword("wifi"));

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Password"
            name="Password"
            ref={register}
          />

          <input type="submit" />
        </form>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        <div>{data}</div>
      </header>
    </div>
  );
}

export default App;
