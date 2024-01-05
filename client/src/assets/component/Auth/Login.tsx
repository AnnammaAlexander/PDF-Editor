// import React from 'react'
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
// import * as Yup from "yup";
import { useFormik } from "formik";
import { LoginFormValues } from "../../interface/authInterface";
import { UserLogin } from "../../API/apiConnection/connection";
import { useDispatch } from "react-redux";
import { setEmail, setName, setToken } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //formik validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email address").required("Required"),
      password: Yup.string()
        .max(10, "Password must be less than 10 character")
        .required("Required"),
    }),
    onSubmit: async (values: LoginFormValues) => {
      // console.log("fffffffff",values);

      const response = await UserLogin(values);
      if (response.status === "success") {
        // console.log("rrrrrrrrrrrr",response);
        
        if (response?.token) {
          dispatch(setToken(response?.token));
          dispatch(setEmail(response?.user?.email));
           dispatch(setName(response?.user?.name))

          toast.success(response?.message);
          navigate("/");
        }
      } else {
        toast.error(response?.message);
      }
    },
  });

  return (
    <div className="">
      <Card shadow={false}>
        <div className="border border-gray-300 p-16 rounded-md w-fill drop-shadow-xl  ">
          <Typography variant="h4" className="text-center" color="blue">
            Log In
          </Typography>
          <Typography color="gray" className="mt-1  text-center font-normal">
            Enter your details
          </Typography>
          <form
            className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96 "
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-2">
              <Typography variant="h5" className="-mb-3 justify-center">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-blue-500 mt-2"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin={undefined}
                // inputProps={{
                //   style: { fontSize: '18px', padding: '12px' }, // Adjust size as needed
                // }}
                {...formik.getFieldProps("email")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null}
              </p>

              <Typography variant="h5" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 mt-2 focus:!border-blue-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin={undefined}
                // inputProps={{
                //   style: { fontSize: '18px', padding: '12px' }, // Adjust size as needed
                // }}
                {...formik.getFieldProps("password")}
              />
              <p className="ml-2 text-sm text-red-800">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </p>
            </div>

            <Button className="mt-6 bg-green-500" type="submit" fullWidth>
              Log In
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to={"/signup"} className="font-medium text-green-400">
                Sign Up
              </Link>
            </Typography>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Login;
