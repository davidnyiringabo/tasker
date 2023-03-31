import React from 'react'
import { useState } from 'react'
import './App.css'
import Login from './assets/components/Login/Login'
import Signup from './assets/components/Signup/Signup'
import Logo from "/Logo.png"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Page from './assets/components/RenderedComponents/Calendar/Calendar'
import Home from './Home'
import Calendar from './assets/components/RenderedComponents/Overview/Overview'
import Overview from "./assets/components/RenderedComponents/Overview/Overview"
import TasksPage from './assets/components/RenderedComponents/Tasks/TasksPage'
import AccountPage from './assets/components/RenderedComponents/Account/AccountPage'
import SettingsPage from "./assets/components/RenderedComponents/Settings/Settings"
import NotificationsPage from './assets/components/RenderedComponents/Notifications/Notifications'
import { ToastContainer } from 'react-toastify'

function App() {
  const [viewAllTasksModal,setViewAllTasksModal] = useState(false)  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/main' element={<Home><Overview /></Home>}/>
        <Route path='/main/overview' element={<Home><Calendar/></Home>}/>
        <Route path='/main/calendar' element={<Home><Page/></Home>}/>
        <Route path='/main/settings' element={<Home><SettingsPage/></Home>}/>
        <Route path='/main/tasks' element={<Home><TasksPage viewAllTasksModal={viewAllTasksModal} setViewAllTasksModal={setViewAllTasksModal}/></Home>}/>
        <Route path='/main/account' element={<Home><AccountPage/></Home>}/>
        <Route path='/main/notifications' element={<Home><NotificationsPage/></Home>}/>
      </Routes>
</BrowserRouter>
  )
}

export default App
