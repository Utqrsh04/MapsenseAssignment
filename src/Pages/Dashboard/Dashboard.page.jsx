import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadVaccineData } from "../../api/API";

const Dashboard = () => {
  const [session, setSession] = useState("");
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    setUserData(data);
    // console.log(data);
    if (data.pincode !== undefined) {
      loadVaccineData(data.pincode).then((response) => {
        setSession(response);
        // console.log(" Response  ", response);
      });
    }
  }, []);

  console.log(" Session data ", session);
  return (
    <div className="mx-auto w-screen h-screen text-center bg-secondry-gray-400 ">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="w-72">
        <h1>
          Name : {userData.name} Pincode : {userData.pincode}
        </h1>
        <h1> email : {userData.email} </h1>
      </div>

      <Link to={"/form"}> Go Back</Link> 

      <div>
        {session &&
          session.map((data, index) => <h2 key={index}> {data.address} </h2>)}
      </div>
    </div>
  );
};

export default Dashboard;
