import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Layout/Navbar/Navbar';

export default function MainLayOut() {
  return <>
  <Navbar/>
  <Outlet/>
  
 
  </>
}
