import React, { useState, useEffect, useRef } from "react";
import { Bar, Line, Doughnut} from "react-chartjs-2";
import {Chart} from "chart.js"

import 'chart.js/auto';


interface Props{
  completed: number,
  uncompleted: number
}

const DoughnutChat = ({completed, uncompleted}:Props)=>{
  const data = {
    labels: ['finished','progressing'],
    datasets: [
      {
        data: [completed, uncompleted],
        fill: true,
        backgroundColor: [
          "#215B9E",
          "#67A6EF"
        ],
        borderColor: 'transparent',
        pointRadius: 0,
        hoverOffset: 20
      }
    ],
  }
  const options = {
    plugins:{
      legend:{
        display: true,
        // position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 10,
          borderRadius: 10
        },
      },
    },
  
    scales:{},
    elements: {
      arc:  {
        borderRadius: 10,
        borderSkipped: "bottom"
      }
    }
  }
      
      return (
        <div className="doughnut-container" style={{width: '100%',height:'100%'}}>
            <h4 style={{fontWeight:"600",padding:'0 4%',color:'#0D325E'}}>Your progress</h4>
            {(!completed && !uncompleted)?  <h3 style={{textAlign: "center", marginTop: "15%"}}>So far no task</h3> : <Doughnut data={data} options={options}/> }
        </div>
      )
    
}

export default DoughnutChat