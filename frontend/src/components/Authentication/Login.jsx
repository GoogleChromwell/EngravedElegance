import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { Link } from 'react-router-dom';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    
})

export default function Login() {

    const initialValues = {
        email: "",
        password: ""
    }

    

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("*Email is required").min(1).max(100).email('*Email must contain "@"'),
        password: Yup.string().required("*Password is required")
    })

  return (
    
    <div className='flex min-h-screen justify-center items-center'>
      
        <div className='border border-black border-opacity-50 w-[360px] h-auto justify-center items-center p-5 rounded-[5px]'>
        <h1 className='text-center font-bold font-inter text-[24px] pb-5'> Sign In </h1>

        <Formik initialValues={initialValues} validationSchema={validationSchema}>
            <Form className='flex flex-col gap-5'>
                <div>
                    <div>
                        <Field 
                            className='
                            w-full border border-gray-500 p-2 rounded-[5px] 
                            text-[16px] font-inter font-medium' 
                            placeholder='Email'
                            id='email'
                            name='email'
                            >
                        </Field>
                    </div>
                    
                    <ErrorMessage className='text-red-500 font-normal font-inter text-[14px]' name="email" component="div" />

                </div>
                

                <div className='space-y-2'>
                    <div>
                        <div>
                            <Field 
                                className='
                                w-full border border-gray-500 p-2 rounded-[5px]
                                text-[16px] font-inter font-medium' 
                                placeholder='Password'
                                id='password'
                                name='password'
                                >
                            </Field>
                        </div>
                        

                        <ErrorMessage className='text-red-500 font-normal font-inter text-[14px] pb-3' name="password" component="div" />
                    </div>
                    
                    

                    <div className='flex justify-between place-items-center'>
                        <div className='flex gap-2'>
                            <input type="checkbox" className='size-[18px] place-self-center'/>
                            <p className='font-inter font-medium text-[14px]'>Show password</p>
                        </div>

                        <div className='flex'>
                            <Link to={'/'} className='font-inter font-medium text-[14px] underline'> Forgot Password?</Link>
                        </div>
                    </div>
                    

                </div>
                <div>

            <div className='space-y-3'>
                <input 
                    type="submit" 
                    value={"Login"}
                    className='
                    bg-blue-500 text-white font-inter font-semibold text-[18px]
                    w-full rounded-[5px] h-[42px] active:bg-blue-600' />

                <div className='flex place-items-center font-inter font-semibold text-[14px] justify-center gap-0.5'>
                    <p className='opacity-50'>No account yet?</p>  
                    <Link to={'/Register'} className=' underline'> Register</Link>
                </div>
                  
            </div>
           
            </div>
            </Form>
        </Formik>
        </div>
    </div>
    
  )
}
