import { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./Layout";
import axios from "axios";
import { AuthContext } from "./context/authContext";

function App() {
  const { setCurrentUser } = useContext(AuthContext);
  useEffect(() => {
    async function getMe() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_API}/auth/me`,
          {
            withCredentials: true,
          }
        );
        setCurrentUser(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getMe();
  }, []);

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
