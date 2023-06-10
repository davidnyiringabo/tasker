import "./notificationspage.css"
import crossx from "/x-circle.png"
import {useEffect, useState} from "react"

interface Props{
    tasks: Task[]
  } 
  interface Task {
    _id: String;
    description: string;
    completed: boolean;
    deadline_day: string;
    deadline_time: string;
    category: string;
    timestamp: number
  }

const NotificationsPage = ({tasks:Props})=>{
    const taskObject = {
        category:"",
        completed:false,
        deadline_day:"",
        deadline_time:"",
        description:"",
        email:"",
        read:false,
        timestamp: null
    }

    const tasks = [

    ]
    
    const [userTasks,setUserTasks] = useState(tasks)

    const [read, setRead] = useState(false)

    const dateOb = new Date()
    const todayDateNumber = dateOb.getDate()
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const monthsOfYeah = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    const today = weekDays[todayDateNumber];
    const todayDate = dateOb.getDate();
    const thisMonthNumber = dateOb.getMonth();
    const thisMonth = monthsOfYeah[thisMonthNumber]
    const thisyeah = dateOb.getFullYear()

    const dayDate = `${thisyeah}-0${thisMonthNumber+1}-${todayDateNumber}`
    userTasks.sort((a,b)=> b.deadline_day.localeCompare(a.deadline_day))

    const clearNotifications = ()=>{
        setUserTasks([])
    }
    return(
        <div className="notificationsContainer">
            <div className="notificationscontainer-header">
                <h3>Notifications</h3>
                <div className="noticationscontainer-right">
                    <img src={crossx} style={{cursor:'pointer'}} onClick={clearNotifications}/>
                    <button type="button" onClick={()=>setRead(true)}>Mark as all read</button>
                </div>

            </div>

            <div className="notificationsPlaceholder">
                { (userTasks.length > 1)? userTasks.map((task)=>{
                    return(
                        <div className={`${read? "singleNotification read" : "singleNotification"}`}>
                            <h5>{todayDate} {thisMonth} {thisyeah}</h5>
                            <h3>{dayDate < task.deadline_day ? `Deadline for ${task.description} is ${task.deadline_day} at ${task.deadline_time}` : dayDate === task.deadline_day? `Deadline for ${task.description} is today at ${task.deadline_time}` : `Deadline for ${task.description} was ${task.deadline_day} at ${task.deadline_time}`}</h3>
                        </div>
                    )
                }):(userTasks.length == 1)? 
                    <div className={`${read? "singleNotification read" : "singleNotification"}`}>
                        <h5>{todayDate} {thisMonth} {thisyeah}</h5>
                        <h3>{dayDate < tasks[0].deadline_day ? `Deadline for ${tasks[0].description} is ${tasks[0].deadline_day} at ${tasks[0].deadline_time}` : dayDate === tasks[0].deadline_day? `Deadline for ${tasks[0].description} is today at ${tasks[0].deadline_time}` : `Deadline for ${tasks[0].description} was ${tasks[0].deadline_day} at ${tasks[0].deadline_time}`}</h3>

                    </div>

                 : <h3 style={{marginTop:'9%'}}>There is no notification</h3>
            } 
            </div>
        </div>
    )
}

export default NotificationsPage