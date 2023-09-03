import {lazy, useState, useEffect, Suspense } from 'react'
import './gStyles/App.css'

const Login = lazy(()=> import("./Pages/Login/Login"))
const Signup = lazy(()=> import("./Pages/Signup/Signup"))
const Page = lazy(()=> import("./components/RenderedComponents/Calendar/Calendar"))
import Home from "./Home"
const Overview = lazy(()=> import("./components/RenderedComponents/Overview/Overview"))
const TasksPage = lazy(()=> import("./components/RenderedComponents/Tasks/TasksPage"))
const AccountPage = lazy(()=> import("./components/RenderedComponents/Account/AccountPage"))
const SettingsPage = lazy(()=> import("./components/RenderedComponents/Settings/Settings"))
const NotificationsPage = lazy(()=> import("./components/RenderedComponents/Notifications/Notifications"))
const TermsPage = lazy(()=> import("./Pages/Terms/Terms"))
const DataPolicyPage = lazy(()=> import("./Pages/data_Policy/DataPolicyPage"))
const AboutPage = lazy(()=> import("./Pages/about/About"))
const FeedbackPage = lazy(()=> import("./Pages/feedback/FeedbackPage"))
const ForgotPasswordPage = lazy(()=> import("./Pages/ForgotPassoword/ForgotPage"))
const ResetPasswordPage = lazy(()=> import("./Pages/ForgotPassoword/ResetPassword"))
import Loader from "./components/Loaders/Loader"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import axios from 'axios'
import {baseurl} from "./data/api"
import PageLoader from "./components/Loaders/PageLoader"


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

  console.log(userLogginEmail)
  console.log(tasks)

  useEffect( ()=>{

    axios.get(`${baseurl}/v1/api/tasks/${userLogginEmail}`)
           .then((response)=>{
            const userTasks = response.data
            setTasks(userTasks)
            
            const tasksObjects = response.data.map((task)=>{
              return {
                ... task,
                "read":false
              }
            })

            localStorage.setItem("taskerTasks", JSON.stringify(tasksObjects))
           })
           .catch(err=>{
           })
  },[userLogginEmail])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Suspense fallback={<PageLoader/>}><Login/></Suspense>}/>
        <Route path='/login' element={<Suspense fallback={<PageLoader/>}><Login/></Suspense>}/>
        <Route path='/signup' element={<Suspense fallback={<PageLoader/>}><Signup/></Suspense>}/>
        <Route path='/main' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><Overview tasks={tasks}/></Suspense></Home>}/>
        <Route path='/main/overview' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><Overview tasks={tasks}/></Suspense></Home>}/>
        <Route path='/main/calendar' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><Page tasks= {tasks}/></Suspense></Home>}/>
        <Route path='/main/settings' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><SettingsPage/></Suspense></Home>}/>
        <Route path='/main/tasks' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><TasksPage viewAllTasksModal={viewAllTasksModal} setViewAllTasksModal={setViewAllTasksModal} tasks={tasks} /></Suspense></Home>}/>
        <Route path='/main/account' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><AccountPage/></Suspense></Home>}/>
        <Route path='/main/notifications' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><NotificationsPage tasks={tasks}/></Suspense></Home>}/>
        <Route path='/terms_of_Service' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><TermsPage/></Suspense></Home>}/>
        <Route path='/data_policy' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><DataPolicyPage/></Suspense></Home>}/>
        <Route path='/feedback' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><FeedbackPage/></Suspense></Home>}/>
        <Route path='/about' element={<Home tasks={tasks}><Suspense fallback={<Loader/>}><AboutPage/></Suspense></Home>}/>
        <Route path='/login/forgot-password' element={<Suspense fallback={<Loader/>}><ForgotPasswordPage/></Suspense>}/>
        <Route path='/forgot-password' element={<Suspense fallback={<Loader/>}><ForgotPasswordPage/></Suspense>}/>
        <Route path='/account-recovery/reset-password' element={<Suspense fallback={<Loader/>}><ResetPasswordPage/></Suspense>}/>
        <Route path='/logout' element={<Suspense fallback={<PageLoader/>}><TermsPage/></Suspense>}/>
      </Routes>
</BrowserRouter>
  )
}

export default App
