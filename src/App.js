import Dashboard from "./Pages/Dashboard/Dashboard.page";
import Landing from "./Pages/Landing/Landing.page";
import { BrowserRouter as Router, Switch, Route , Redirect } from "react-router-dom";
import { loadVaccineData } from "./api/API";
import { useEffect } from "react";

function App() {
  let pin = "" ; 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    // console.log(data);
    if (data.pincode !== undefined) {
      pin = data.pincode
      loadVaccineData(data.pincode).then((response) => {
        // console.log(" Response  ", response);
      });
    }
  }, []);

  console.log("Pin " , pin);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            {pin !== 0 ? <Redirect to="/dashboard" /> : <Landing />}
          </Route>
          <Route path="/form" exact >
            <Landing/>
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
