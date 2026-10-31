
"use client";
import React, { useContext, useState } from 'react'
import {Person ,Envelope ,  Calendar, Key} from "@gravity-ui/icons";
import {InputGroup, TextField, ListBox, Select, Button, toast} from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../../Schema/register';
import type { RegisterForm } from '../../../Interfaces/RgisterForm';
import axios, { AxiosError, isAxiosError } from 'axios';
import { RingLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

export default function Register() {
let navigate= useNavigate();
let [isLoading,setIsLoading]=useState(false)
const {register,handleSubmit, setValue,formState:{errors}}=useForm({mode:"onChange",
  defaultValues:{
    name:"",
    username:"",
    dateOfBirth:new Date(),
    email:"",
    password:"",
    rePassword:"",
    gender:"male"

  },
  resolver:zodResolver(registerSchema),
  
})


async function onSave(formData:RegisterForm){
  if(isLoading) return;

  try{
    setIsLoading(true)
    let {data}= await axios.post('https://route-posts.routemisr.com/users/signup',formData)
    console.log(data)
    toast.success(data.message)
    setTimeout(() => {
      navigate('/auth/login')
    }, 1000);


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
  className="font-extrabold text-2xl text-orbit-ink">Create a new account</h1>
  <p  className="text-[14px] font-normal text-orbit-lead mt-1">It is quick and easy.</p>

  <form onSubmit={handleSubmit(onSave)} className="mt-3 space-y-2">


    <TextField className="w-full  mb-0 "   >
      <InputGroup className="p-2 border
 
      border-gray-300
      focus-within:border-orbit-violet
      border-2
      focus-within:ring-0
      focus-within:outline-none

">
        <InputGroup.Prefix>
          <Person className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="Full name" {...register('name')} />
      </InputGroup>
    </TextField>
    {errors.name && <small className='text-red-600 '>{errors.name?.message}</small>}

    <TextField className="w-full mt-4  " >

      <InputGroup className="p-2 border
      border-gray-300
      focus-within:border-orbit-violet
      border-2
      focus-within:ring-0">
        <InputGroup.Prefix>
          <span className="text-muted">@</span>
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="Username(optional)" {...register('username')} />
      </InputGroup>
    </TextField>

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

    <Select className="w-full mt-2 " placeholder="Select gender" {...register('gender')}
    onChange={(value) => {
  if (value === "male" || value === "female") {
    setValue("gender", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }
    }} >
      
      <Select.Trigger className="border
 
      border-gray-300
      focus-within:border-orbit-violet
      border-2
      focus-within:ring-0" >
        
        <Select.Value  className="p-2 " />
        
        <Select.Indicator />
      </Select.Trigger>
      
      <Select.Popover   >
        <ListBox >
          <ListBox.Item id="male" textValue="male">
            Male
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="female" textValue="female">
            Female
            <ListBox.ItemIndicator />
          </ListBox.Item>
          
        </ListBox>
      </Select.Popover>
    </Select>
{errors.gender && <small className='text-red-600 '>{errors.gender?.message}</small>}



    <TextField className="w-full mb-0 "  type="date" {...register('dateOfBirth')}>
      <InputGroup className="p-2 border
      border-gray-300
      focus-within:border-orbit-violet
      border-2
      focus-within:ring-0">
        <InputGroup.Prefix  >
          <Calendar className="size-5 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full "  />
      </InputGroup>
    </TextField>
{errors.dateOfBirth && <small className='text-red-600 '>{errors.dateOfBirth?.message}</small>}

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

      <TextField className="w-full mt-2 "  type='password'>
      <InputGroup className="p-2 border
 
      border-gray-300
      focus-within:border-orbit-violet
      border-2
      focus-within:ring-0">
        <InputGroup.Prefix>
          <Key className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="confirm Password" {...register('rePassword')}/>
      </InputGroup>
    </TextField>
    {errors.rePassword && <small className='text-red-600 '>{errors.rePassword?.message}</small>}

    <Button type='submit'  className="w-full mt-4 p-6 bg-orbit-violet hover:bg-orbit-ink transform  pill">
        {isLoading &&<RingLoader color="white" size={30} />}
        Create New Account
      </Button>
    

  </form>
  </>
}
