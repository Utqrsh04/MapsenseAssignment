import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadVaccineData } from "../../api/API";
import Loader from "../../Loader";

const Dashboard = () => {
  const [session, setSession] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    setUserData(data);
    // console.log(data);
    if (data !== null) {
      loadVaccineData(data.pincode).then((response) => {
        setSession(response);
        // console.log(" Response  ", response);
      });
    }
  }, []);

  if (!userData)
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-xl font-bold ">
          Please Fill the form to view stats
        </h1>
        <h1>
          <a href="/"> Link to form </a>
        </h1>
      </div>
    );

  if (!session) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="mx-auto w-screen text-center ">
      {userData && (
        <div className="flex flex-row">
          <div className="w-48 flex flex-col mt-9 text-left ml-14 ">
            <h1 className="font-medium text-xl">
              {userData.name} {", "}
              <p className=" text-sm inline-block font-semibold ">
                {userData.pincode}
              </p>
            </h1>
            <h1>{userData.email}</h1>
          </div>

          <div className=" w-48 h-20 bg-logoImage bg-contain right-0 mr-5 mt-5 fixed"></div>
        </div>
      )}

      <div className="w-full text-center mb-10 mt-7">
        {session && (
          <div className="mx-14">
            <div className=" flex flex-row justify-evenly items-center bg-primary-blue h-16">
              <span className="text-xl font-bold text-primary-white w-full ">
                Pincode
              </span>
              <span className="text-xl font-bold text-primary-white w-full ">
                District Name
              </span>
              <span className="text-xl font-bold text-primary-white w-full ">
                Name
              </span>
              <span className="text-xl font-bold text-primary-white w-full ">
                Fee Type
              </span>
              <span className="text-xl font-bold text-primary-white w-full ">
                State Name
              </span>
              <span className="text-xl font-bold text-primary-white w-full ">
                Vaccine
              </span>
              <span className="text-xl font-bold text-primary-white w-full ">
                Age Limit
              </span>
              <span className="text-xl font-bold text-primary-white w-full ">
                Slots
              </span>
            </div>
            {session.length === 0 && (
              <h2 className="text-xl font-semibold mt-5">
                No data found for this pincode at the moment
              </h2>
            )}
            {session.map((data, index) => (
              <div
                key={index}
                className={`flex flex-row text-secondry-black justify-evenly items-center h-16  ${
                  index % 2 === 0 ? " bg-primary-200 " : " bg-primary-100"
                }  `}
              >
                <span className="text-xl text-center font-bold w-full  ">
                  {data.pincode}
                </span>
                <span className="text-xl text-center font-bold  w-full">
                  {data.district_name}
                </span>
                <span className="text-lg text-center font-bold  w-full">
                  {data.name}
                </span>
                <span className="text-xl text-center font-bold  w-full">
                  {data.fee_type}
                </span>
                <span className="text-xl text-center font-bold  w-full">
                  {data.state_name}
                </span>
                <span className="text-xl text-center font-bold  w-full">
                  {data.vaccine}
                </span>
                <span className="text-xl text-center font-bold  w-full">
                  {data.min_age_limit}
                </span>
                <span className="text-xl text-center font-bold  w-full">
                  slots
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full  bottom-0">
        <div className="flex flex-row justify-center items-center mb-10">
          <Link
            onClick={() => localStorage.removeItem("UserData")}
            to="/"
            className="bg-primary-red px-9 flex items-center py-3 rounded-md font-bold text-2xl mr-20 text-primary-white h-16 mb-5"
          >
            Go Back
          </Link>

          <Link
            to="/dashboard"
            className="bg-primary-blue px-9 flex items-center py-3 rounded-md font-bold text-2xl text-primary-white h-16 mb-5"
          >
            Update Data
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
