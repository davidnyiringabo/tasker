import React, { useState, useEffect, useRef } from "react";
import { Bar, Line, Doughnut} from "react-chartjs-2";
import {Chart} from "chart.js"

import 'chart.js/auto';
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
const chart = ({tasks}:Props)=>{

    const chartRef:any = useRef();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','july','august','september'];
    const jan = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 0
    })
    const feb = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 1
    })
    const march = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 2
    })
    const apr = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 3
    })
    const may = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 4
    })
    const jun = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 5
    })
    const jul = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 6
    })
    const aug = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 7
    })
    const sept = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 8
    })
    const oct = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 9
    })

    const nov = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 10
    })
    const dec = tasks.filter(task=>{
      return (new Date(task.timestamp)).getMonth() == 11
    })
  
  const [userData, setUserData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','july','august'],
    datasets: [
      {
        label:'',
        data: [jan.length, feb.length,march.length, apr.length, may.length, jun.length, jul.length,aug.length],
        fill: true,
        backgroundColor: 'transparent',
        borderColor: '#0075FF',
        tension:0.5,
        pointRadius: 0
      }
    ],
  });

  const options = {
    plugins:{
      legend:{
        dispay: false,
        labels: {
          display: false,
          boxWidth: 10,
          padding: 10,
          borderRadius: 10
        },
      },
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context:any) {
          return context.dataset.label + ": " + context.parsed.y;
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 50,
        top: 8,
        bottom: -10,
      },
    },
    scales:{
      x:{
        grid:{
          display: false
        }
      },
      y:{
        suggestedMin: 0,
        suggestedMax: 30,
        grid: {
          display: true
        }
      },
  
    },
  }
  
      
      return (
        <div className="chart-container" style={{width: '100%',height:'100%'}}>
            <h3 style={{fontWeight:"600",padding:'2% 4% 4%',color:'#0D325E'}}>Your statistics</h3>
            <Line ref={chartRef} data={userData} options={options}/>
        </div>
      )
    
}

export default chart
