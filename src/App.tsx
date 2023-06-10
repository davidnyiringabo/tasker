import { useState, useEffect } from 'react'
import './gStyles/App.css'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Page from './components/RenderedComponents/Calendar/Calendar'
import Home from './Home'
import Overview from "./components/RenderedComponents/Overview/Overview"
import TasksPage from './components/RenderedComponents/Tasks/TasksPage'
import AccountPage from './components/RenderedComponents/Account/AccountPage'
import SettingsPage from './components/RenderedComponents/Settings/Settings'
import NotificationsPage from './components/RenderedComponents/Notifications/Notifications'
import axios from 'axios'
import TermsPage from './Pages/Terms/Terms'
import DataPolicyPage from './Pages/data_Policy/DataPolicyPage'
import AboutPage from './Pages/about/About'
import FeedbackPage from './Pages/feedback/FeedbackPage'
import ForgotPasswordPage from './Pages/ForgotPassoword/ForgotPage'
import ResetPasswordPage from './Pages/ForgotPassoword/ResetPassword'
import {baseurl} from "./data/api"


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
  const userLogginEmail = localStorage.getItem("taskerUserEmail")

  const [tasks,setTasks] = useState<Task[]>([
  ]);

  useEffect( ()=>{

    axios.get(`${baseurl}/v1/api/tasks/${userLogginEmail}`)
           .then((response)=>{
            const userTasks = response.data
            setTasks(userTasks)
           })
           .catch(err=>{
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
        <Route path='/login/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/account-recovery/reset-password' element={<ResetPasswordPage/>}/>
        <Route path='/logout' element={<TermsPage/>}/>
      </Routes>
</BrowserRouter>
  )
}

export default App
