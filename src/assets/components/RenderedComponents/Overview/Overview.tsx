import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js';
import React, { useState } from 'react';
import TasksComponents from "../../TasksComponets"
import Chartco from '../../Charts/Line';
import DoughnutChat from '../../Charts/Doughnut';
import AllTasks from '../../AllTasks';
import "./overview.css"
interface Props{
  tasks: Task[]
}

interface Task {
  _id: string;
  description: string;
  completed: boolean;
  deadline_day: string;
  deadline_time: string;
  category: string;
  timestamp: number
}

const Calendar = ({tasks}:Props)=>{
        const completedTasks=  tasks.filter(task=>{
          return task.completed
        })

        const unCompletedTasks = tasks.filter(task=>{
          return !task.completed
        })

        const [viewAllTasksModal,setViewAllTasksModal] = useState(false)  
        const dateOb = new Date();
        const todayDateNumber = dateOb.getDay()
        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        const monthsOfYeah = ["January","February","March","April","May","June","July","August","September","October","November","December"]

        const today = weekDays[todayDateNumber];
        const todayDate = dateOb.getDate();
        const thisMonthNumber = dateOb.getMonth();
        const thisMonth = monthsOfYeah[thisMonthNumber]
        const thisyeah = dateOb.getFullYear()
        const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };

        return(
            <div className="overviewContainer">
                <div className="chartContainer">
                  <div className='left-chart'>
                    <Chartco tasks={tasks}/>
                  </div>
                  <div className='right-chart'>
                    <DoughnutChat completed={completedTasks.length} uncompleted={unCompletedTasks.length}/>
                  </div>
                </div>

                <div className="overviewTasksContainer">
                  <div className='tasks-upper-header'>
                    <div className='tasks-upper-header-left'>
                      <h3>Tasks for today</h3>
                        <h5>{today}, {todayDate} {thisMonth} {thisyeah}</h5>
                    </div>

                    <button type='button' onClick={()=>setViewAllTasksModal(true)} style={{cursor:'pointer'}}> View all tasks</button>                      
                  </div>

                   <TasksComponents tasks={tasks}/>
                </div>

                {viewAllTasksModal && (
                <div className="modelContainer">
                    <div className="overlay">
                        <div className="viewTasksmodelContent">
                            <div className="view-task-model-header">
                                <h2 style={{color:"#fff"}}>All tasks</h2>
                                <button type='button' onClick={()=>setViewAllTasksModal(!viewAllTasksModal)} className="close-view-all-tasks-model">close</button>
                            </div>
                            <div className="alltaskscontainer">
                                <AllTasks tasks={tasks}/>
                            </div>

                            
                        </div>
                    </div>
                </div>
            )}

            </div>
        )
}
export default Calendar