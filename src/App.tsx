import { useState, useEffect } from 'react'
import './App.css'
import Login from './assets/components/Login/Login'
import Signup from './assets/components/Signup/Signup'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Page from './assets/components/RenderedComponents/Calendar/Calendar'
import Home from './Home'
import Overview from "./assets/components/RenderedComponents/Overview/Overview"
import TasksPage from './assets/components/RenderedComponents/Tasks/TasksPage'
import AccountPage from './assets/components/RenderedComponents/Account/AccountPage'
import SettingsPage from "./assets/components/RenderedComponents/Settings/Settings"
import NotificationsPage from './assets/components/RenderedComponents/Notifications/Notifications'
import axios from 'axios'
import TermsPage from "./assets/components/Pages/Terms/Terms"
import DataPolicyPage from './assets/components/Pages/data_Policy/DataPolicyPage'
import AboutPage from './assets/components/Pages/about/About'
import FeedbackPage from './assets/components/Pages/feedback/FeedbackPage'

interface Task {
  _id: string;
  description: string;
  completed: boolean;
  deadline_day: string;
  deadline_time: string;
  category: string;
  timestamp: number;
}

function App() {
  const [viewAllTasksModal,setViewAllTasksModal] = useState(false) 
  const cookie= document.cookie.split('=')
  const userLogginEmail = cookie[1]

  
  const [tasks,setTasks] = useState<Task[]>([
  ]);

  useEffect( ()=>{

    axios.get(`http://localhost:7200/v1/api/tasks/${userLogginEmail}`)
           .then((response)=>{
            const userTasks = response.data
            setTasks(userTasks)
           })
           .catch(err=>{
            console.log(err)
           })
  },[userLogginEmail])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/main' element={<Home tasks={tasks}><Overview tasks={tasks}/></Home>}/>
        <Route path='/main/overview' element={<Home tasks={tasks}><Overview tasks={tasks}/></Home>}/>
        <Route path='/main/calendar' element={<Home tasks={tasks}><Page tasks= {tasks}/></Home>}/>
        <Route path='/main/settings' element={<Home tasks={tasks}><SettingsPage/></Home>}/>
        <Route path='/main/tasks' element={<Home tasks={tasks}><TasksPage viewAllTasksModal={viewAllTasksModal} setViewAllTasksModal={setViewAllTasksModal} tasks={tasks} /></Home>}/>
        <Route path='/main/account' element={<Home tasks={tasks}><AccountPage/></Home>}/>
        <Route path='/main/notifications' element={<Home tasks={tasks}><NotificationsPage tasks={tasks}/></Home>}/>
        <Route path='/terms_of_Service' element={<Home tasks={tasks}><TermsPage/></Home>}/>
        <Route path='/data_policy' element={<Home tasks={tasks}><DataPolicyPage/></Home>}/>
        <Route path='/feedback' element={<Home tasks={tasks}><FeedbackPage/></Home>}/>
        <Route path='/about' element={<Home tasks={tasks}><AboutPage/></Home>}/>
        <Route path='/logout' element={<TermsPage/>}/>
      </Routes>
</BrowserRouter>
  )
}

export default App
