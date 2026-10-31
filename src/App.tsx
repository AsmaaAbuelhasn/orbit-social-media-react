import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes/AppRoutes'
import { Toast } from '@heroui/react'
import AuthContextProvider from './Context/AuthContext'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import CounterContextProvider from './Context/CounterContext'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const quaryClient = new QueryClient()


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QueryClientProvider client={quaryClient}>
      <ReactQueryDevtools initialIsOpen={true}/>
   <AuthContextProvider>
   <CounterContextProvider>
   <Toast.Provider placement='top'/>
    
     <RouterProvider router={routes}>

     </RouterProvider>
    </CounterContextProvider>
    
    </AuthContextProvider>
    </QueryClientProvider>
    
    
   
    </>
  )
}

export default App
