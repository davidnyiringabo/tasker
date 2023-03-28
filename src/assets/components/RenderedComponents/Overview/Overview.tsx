import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js';
import { useState } from 'react';
import TasksComponents from "../../TasksComponets"
import Chartco from '../../Charts/Line';
import DoughnutChat from '../../Charts/Doughnut';

import "./overview.css"

interface Props {
  todayDate: number
}

const Calendar = ()=>{

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
  
        const [tasks,setTasks]  = useState({})
      
        return(
            <div className="overviewContainer">
                <div className="chartContainer">
                  <div className='left-chart' >
                    <h4>Your statistics</h4>
                    <Chartco/>
                  </div>
                  <div className='right-chart'>
                    <DoughnutChat/>
                  </div>
                </div>

                <div className="overviewTasksContainer">
                  <div className='tasks-upper-header'>
                    <div className='tasks-upper-header-left'>
                      <h3>Tasks for today</h3>
                        <h5>{today}, {todayDate} {thisMonth} {thisyeah}</h5>
                    </div>

                    <button type='button'> View all tasks</button>                      
                  </div>

                   <TasksComponents/>
                </div>

            </div>
        )
}
export default Calendar