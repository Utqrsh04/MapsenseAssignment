import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as yup from "yup";
import { loadVaccineData } from "../../api/API";

const Landing = () => {

  const history = useHistory()
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    // console.log(data);
    if (data !== undefined) setUserData(data);
  }, []);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    pincode: "",
  });

  // useFormik hook and yup validation
  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik(
    {
      initialValues: { name: "", email: "", pincode: "" },
      validationSchema: yup.object().shape({
        name: yup
          .string()
          .required("First Name is required")
          .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed."),

        email: yup.string().required("email is required").email(),

        pincode: yup.string().required("Pincode is required"),
      }),
      onSubmit: (data) => {
        // console.log(data);
        localStorage.setItem("UserData", JSON.stringify(data));
        setUserData(() => data);
        history.push("/dashboard");
      },
    }
  );

  // useEffect(() => {
  //   loadVaccineData(userData.pincode).then((response) =>
  //     console.log(" API DATA ", response)
  //   );
  // }, []);

  return (
    <div>
      <div className="flex font-sans">
        {/* heading */}
        <div className="absolute">
          <h1 className=" mt-10 font-bold text-4xl text-primary-white ml-12 h-11">
            Vaccine Tracker
          </h1>
          <p className="text-primary-white ml-14 mt-2 w-52 h-14 text-xs">
            Find all the important information and all the things related to
            Covid Virus and Vaccine Here
          </p>
        </div>
        <div className="bg-heroImage bg-contain bg-no-repeat w-731px h-720px ">
          <div className="bg-secondry-gray-900 bg-opacity-50 w-731px h-720px "></div>
        </div>

        {/*logo  */}
        <div className=" w-48 h-20 bg-logoImage bg-contain right-0 mr-5 mt-5 fixed"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className=" w-96 flex flex-col  mt-32 ml-12  ">
            <div className="mb-8">
              <h1 className="text-xl font-medium">Name</h1>
              <input
                id="name"
                value={values.name}
                errors={errors.name}
                onChange={handleChange}
                required
                type="text"
                placeholder="Name"
                className="w-463px bg-primary-100 border-2 p-5 h-16  border-secondry-black mt-3"
              />
              {errors.name ? errors.name : " "}
            </div>

            <div className="mb-8">
              <h1 className="text-xl font-medium">Email</h1>
              <input
                id="email"
                value={values.email}
                onChange={handleChange}
                errors={errors.email}
                required
                type="email"
                placeholder="email"
                className="w-463px bg-primary-100 border-2 p-5 h-16  border-secondry-black mt-3"
              />
              {errors.email ? errors.email : " "}
            </div>
            <div className="mb-8">
              <h1 className="text-xl font-medium">Pincode</h1>
              <input
                id="pincode"
                value={values.pincode}
                onChange={handleChange}
                errors={errors.pincode}
                required
                type="number"
                placeholder="Pincode"
                className="w-463px bg-primary-100 border-2 p-5 h-16  border-secondry-black mt-3"
              />
              {errors.pincode ? errors.pincode : " "}
            </div>

            <button
              type="submit"
              onClick={() => console.log(" Submit Clicked")}
              className="bg-primary-blue font-extrabold text-2xl text-primary-white w-463px h-16 mb-5"
            >
              Show Statistics
            </button>
            <button
              type="reset"
              onClick={() => console.log(" Reset Clicked")}
              className="bg-primary-red font-extrabold text-2xl text-primary-white w-463px h-16"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Landing);
