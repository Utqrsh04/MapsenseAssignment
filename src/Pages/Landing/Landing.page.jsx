import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { useHistory } from "react-router";
import * as yup from "yup";

const Landing = () => {
  const history = useHistory();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    // console.log(data);
    if (data !== null) history.push("/dashboard"); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useFormik hook and yup validation
  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik(
    {
      initialValues: { name: "", email: "", pincode: "" },
      validationSchema: yup.object().shape({
        name: yup
          .string()
          .required("First Name is required")
          .matches(
            /^[aA-zZ\s]+$/,
            "Numbers or Special Characters are not allowed."
          ),

        email: yup.string().required("email is required").email(),

        pincode: yup.string().required("Pincode is required").max(6).min(6),
      }),
      onSubmit: (data) => {
        // console.log(data);
        localStorage.setItem("UserData", JSON.stringify(data));
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
        <div className=" flex ">
          {/* heading */}
          <div className="absolute md:ml-5 xl:text-primary-white text-secondry-black ">
            <h1 className=" mt-10 font-bold text-4xl ml-12 h-11">
              Vaccine Tracker
            </h1>
            <p className=" ml-14 mt-2 w-52 h-14 text-xs">
              Find all the important information and all the things related to
              Covid Virus and Vaccine Here
            </p>
          </div>

          <div className="flex xl:hidden justify-center pl-16 mt-52 items-start  ">
          <div className=" block bg-heroImage bg-contain bg-no-repeat rounded-lg ">
              <div className="bg-secondry-gray-900 bg-opacity-50 w-80 h-80 rounded-lg  "></div>
            </div>
          </div>

          {/* heroImage */}
          <div className="md:w-full flex justify-evenly lg:ml-3 items-center  h-screen bg-contain">
            <div className="bg-heroImage bg-contain bg-no-repeat ">
              <div className="bg-secondry-gray-900 bg-opacity-50 xl:w-731px h-720px "></div>
            </div>
          </div>
        </div>

        {/*logo  */}
        <div className=" w-48 h-20 bg-logoImage bg-contain right-0 mr-5 mt-5 fixed"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} onReset={handleReset} className="flex justify-center">
          <div className="flex flex-col mt-24 items-center sm:pl-3 md:pl-8 lg:pl-40 xl:pl-14 2xl:pl-28  ">

            <div className="mb-8 ">
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
              className="bg-primary-blue font-extrabold text-2xl text-primary-white w-463px h-16 mb-5"
            >
              Show Statistics
            </button>
            <button
              type="reset"
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
