import "./notificationspage.css"
import crossx from "/x-circle.png"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const NotificationsPage = ()=>{
    const navigate = useNavigate()
    const [tasks,setTasks] = useState([
        {
            description: 'Go to job interview',
            category: 'work',
            deadline: '15h00',
            completed: true
        },
        {
            description: 'Work on vanica project',
            category: 'work',
            deadline: '18h00',
            completed: false
        },
        {
            description: 'Work on vanica project',
            category: 'work',
            deadline: '18h00',
            completed: false
        },
        {
            description: 'Work on vanica project',
            category: 'work',
            deadline: '18h00',
            completed: false
        },
        {
            description: 'Work on vanica project',
            category: 'work',
            deadline: '18h00',
            completed: false
        },
        {
            description: 'Work on vanica project',
            category: 'work',
            deadline: '18h00',
            completed: false
        },
        {
            description: 'Work on vanica project',
            category: 'work',
            deadline: '18h00',
            completed: false
        },
        {
            description: 'Work on vanica project',
            category: 'work',
            deadline: '18h00',
            completed: false
        }
    ])

    const [read, setRead] = useState(false)

    const dateOb = new Date();
    const todayDateNumber = dateOb.getDay()
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const monthsOfYeah = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    const today = weekDays[todayDateNumber];
    const todayDate = dateOb.getDate();
    const thisMonthNumber = dateOb.getMonth();
    const thisMonth = monthsOfYeah[thisMonthNumber]
    const thisyeah = dateOb.getFullYear()

    const clearNotifications = ()=>{
        setTasks([])
    }

    const cookie= document.cookie.split('=')
    const userLogginEmail = cookie[1]
  
      useEffect( ()=>{
  
        axios.get(`http://localhost:7100/v1/api/tasks/${userLogginEmail}`)
               .then((response)=>{
                const userTasks = response.data
  
                setTasks(userTasks)
                console.log(response.data) 
                console.log("removed")
                // navigate('/main/overview') 
               })

              

      },[userLogginEmail])
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
                { (tasks.length >1)? tasks.map((task)=>{
                    return(
                        <div className={`${read? "singleNotification read" : "singleNotification"}`}>
                            <h5>{todayDate} {thisMonth} {thisyeah}</h5>
                            <h3>Deadline for "{task.description}" is {task.deadline}</h3>
                        </div>
                    )
                }):(tasks.length == 1)? (
                    <div className={`${read? "singleNotification read" : "singleNotification"}`}>
                        <h5>{todayDate} {thisMonth} {thisyeah}</h5>
                        <h3>Deadline for "{tasks[0].description}" is {tasks[0].deadline}</h3>
                    </div>

                ) : <h3 style={{marginTop:'9%'}}>There is no notification</h3>} 
            </div>
        </div>
    )
}

export default NotificationsPage