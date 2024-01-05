
//   import * as Yup from "yup"
// import { Link, useNavigate } from "react-router-dom";

// import { useFormik } from "formik";
// import { register } from "../../API/apiConnection/connection";
// import { toast } from "react-toastify";

// import {useDispatch } from 'react-redux';
// import {RegisterFormValues, 
// } from '../../interface/authInterface';
// import { setEmail, setName, setToken } from "../../redux/slice";

// function signup() {
//     const navigae = useNavigate()
//     const dispatch = useDispatch()
//     //formik validation
   
//     //formik validation
    
//     const formik = useFormik({
//       initialValues: {
//        name:'',
//         email: '',
//         password: ''
//       },
//       validationSchema: Yup.object({
//         name: Yup.string()
//         .max(10, 'Name must be less than 10 character')
//         .required('Required'),
//         email: Yup.string()
//           .email("Invalid Email address")
//           .required('Required'),
//         password: Yup.string()
//           .max(10, 'Password must be less than 10 character')
//           .required('Required')
//       }),
//       onSubmit: async (values:RegisterFormValues) => {
        
            

        
        
    
//         }
  
      
//     })



//   return (
//   <div className="">


//  
//   </div>
//   )
// }

// export default signup


// import React from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useFormik } from "formik";
import { Link , useNavigate} from "react-router-dom";
import * as Yup from 'yup'
import { RegisterFormValues, signupResponse, } from "../../interface/authInterface";
import { register } from "../../API/apiConnection/connection";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { setEmail, setName, setToken } from "../../redux/slice";
function Signup() {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
   //formik validation
   const formik = useFormik({
    initialValues: {
     name:'',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
      .max(20, 'Must be less than 20 characters')
      .required('Required'),
      email: Yup.string()
        .email("Invalid Email address")
        .required('Required'),
      password: Yup.string()
        .max(10, 'Password must be less than 10 character')
        .required('Required')
    }),
    onSubmit: async (values:RegisterFormValues) => {

        const response:signupResponse=  await register(values)
        console.log("responsesssssss",response);
        
        if(response?.status ==='success'){
            // if(response?.token){
                // dispatch(setToken(response?.token))
                // dispatch(setName(response?.user?.name))
                // dispatch(setEmail(response?.user?.email))
                navigate('/')
                toast.success(response?.message)
            // }
        }else{
            toast.error('Email already exist. Please try again.') 
        }
  
      }

    
  })

  return (
    <div>
         <Card shadow={false} >
     <div className="border border-gray-300 p-16 rounded-md w-fill drop-shadow-xl  ">
       <Typography variant="h4" className="text-center" color="blue">
         Sign Up
       </Typography>
       <Typography color="gray" className="mt-1  text-center font-normal">
         Enter your details
       </Typography>
       <form
         className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96 "
          onSubmit={formik.handleSubmit}
       >
         <div className="mb-1 flex flex-col gap-2">
         <Typography variant="h6" className="-mb-3 justify-center">
             Your Name
           </Typography> 
           <Input
             size="lg"
             placeholder="enter name "
             className="!border-t-blue-gray-200 focus:!border-blue-500 mt-2"
             labelProps={{
               className: "before:content-none after:content-none",
             }}
             crossOrigin={undefined}
            
             {...formik.getFieldProps('name')}
           />
           <p className="ml-2 text-sm text-red-800">
             {formik.touched.name && formik.errors.name ?
             formik.errors.name : null}
           </p>
           <Typography variant="h6" className="-mb-3 justify-center">
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
             {...formik.getFieldProps('email')}
           />
           <p className="ml-2 text-sm text-red-800">
             {formik.touched.email && formik.errors.email ?
             formik.errors.email : null}
           </p>
           <Typography variant="h6" color="blue-gray" className="-mb-3">
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
            {...formik.getFieldProps('password')}
          />
          <p className="ml-2 text-sm text-red-800">
            {formik.touched.password && formik.errors.password ?
            formik.errors.password : null}
          </p>
        </div>
        <Button className="mt-6 bg-green-500" type="submit" fullWidth>
          Log In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to={'/'} className="font-medium text-green-400">
          Sign In
          </Link>
        </Typography>
      </form>
    </div>
  </Card>
  
   </div>
  )
            }
export default Signup