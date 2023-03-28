import React, { useState, useEffect, useRef } from "react";
import { Bar, Line, Doughnut} from "react-chartjs-2";
import {Chart} from "chart.js"

import 'chart.js/auto';

const DoughnutChat = ()=>{

    const chartRef:any = useRef();

  const data = {
    labels: ['finished','progress'],
    datasets: [
      {
        label: "",
        data: [50, 20,30],
        fill: true,
        backgroundColor: '#215B9E',
        borderColor: '#0075FF',
        pointRadius: 0
      }
    ],
  };

  const options = {
    scales:{
        // x:{
        //     grid: {
        //         display: false
        //     }
        // }
    }
  }
      
      return (
        <>
            <Doughnut data={data} options={options}/>
        </>
      )
    
}

export default DoughnutChat