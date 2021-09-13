import Dashboard from "./Pages/Dashboard/Dashboard.page";
import Landing from "./Pages/Landing/Landing.page";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { loadVaccineData } from "./api/API";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function App() {
  const [pincode, setPincode] = useState(undefined);
  useEffect(() => {

    const data = JSON.parse(localStorage.getItem("UserData"));
    // console.log("App Page data", data);
    if (data === null) {
      // console.log("null data ");
      return;
    }

    <Loader/>

    setPincode(() => data.pincode);
    loadVaccineData(data.pincode).then((response) => {
      // console.log("Response  ", response);
    });
  }, []);

  
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            {pincode !== undefined ? <Redirect to="/dashboard" /> : <Landing />}
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
