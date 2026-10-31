import React, { useContext, useState } from 'react'
import AppIntro from '../../../Components/AppIntro/AppIntro'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../Schema/login';
import type { LoginForm } from './../../../Interfaces/loginForm';
import axios, { isAxiosError } from 'axios';
import { Button, InputGroup, TextField, toast } from '@heroui/react';
import { Envelope, Key, Person } from '@gravity-ui/icons';
import { RingLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

export default function Login() {
  let navigate= useNavigate();
let [isLoading,setIsLoading]=useState(false)
const {register,handleSubmit, setValue,formState:{errors}}=useForm({mode:"onChange",
  defaultValues:{
    email:"",
    password:""

  },
  resolver:zodResolver(loginSchema),
  
})
let {updateToken}=useContext(AuthContext)


async function onSave(formData:LoginForm){
  if(isLoading) return;

  try{
    setIsLoading(true)
    let {data}= await axios.post('https://route-posts.routemisr.com/users/signin',formData)
    console.log(data)
    updateToken(data.data.token)
    toast.success(data.message)
    setTimeout(()=>{
  navigate('/')
    },1000)
   

  }catch(error){
    if(isAxiosError(error)){
      console.log(error.response?.data.message)
      toast.danger(error.response?.data.message)
    }


  }finally{
    setIsLoading(false)

  }

}

  return <>
  <h1
  className="font-extrabold text-2xl text-orbit-ink">Log in to Orbit</h1>
  <p  className="text-[14px] font-normal text-orbit-lead mt-1">Log in and Keep close.</p>

  <form onSubmit={handleSubmit(onSave)} className="mt-3 space-y-2">

    <TextField className="w-full mb-0  ">
      <InputGroup className="p-2 border
 
      border-gray-300
      focus-within:border-orbit-violet
      border-2
      focus-within:ring-0">
        <InputGroup.Prefix>
          <Envelope className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="Email address" {...register('email')} />
      </InputGroup>
    </TextField>
{errors.email && <small className='text-red-600 '>{errors.email?.message}</small>}


     <TextField className="w-full mt-2 mb-0"    type='password'>
      <InputGroup className="p-2 border
 
      border-gray-300
      focus-within:border-orbit-violet
      border-2
      focus-within:ring-0">
        <InputGroup.Prefix>
          <Key className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="Password"  {...register('password')} />
      </InputGroup>
    </TextField>
    {errors.password && <small className='text-red-600 '>{errors.password?.message}</small>}

    <Button type='submit'  className="w-full mt-4 p-6 bg-orbit-violet hover:bg-orbit-ink transform  pill">
        {isLoading &&<RingLoader color="white" size={30} />}
        Log In
      </Button>
    

  </form>
  </>
}
