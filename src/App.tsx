import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes/AppRoutes'
import { Toast } from '@heroui/react'
import AuthContextProvider from './Context/AuthContext'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const quaryClient = new QueryClient()


function App() {

  return (
    <>
    <QueryClientProvider client={quaryClient}>
      <ReactQueryDevtools initialIsOpen={true}/>
   <AuthContextProvider>
   <Toast.Provider placement='top'/>
    
     <RouterProvider router={routes}>

     </RouterProvider>
    
    </AuthContextProvider>
    </QueryClientProvider>
    
    
   
    </>
  )
}

export default App
