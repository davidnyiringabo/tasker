import React, { useState, useEffect, useRef } from "react";
import { Bar, Line, Doughnut} from "react-chartjs-2";
import {Chart} from "chart.js"

import 'chart.js/auto';

const chart = ()=>{

    const chartRef:any = useRef();
  
  const [userData, setUserData] = useState({
    labels: [2018, 2019, 2020, 2021, 2022],
    datasets: [
      {
        label: "Your statistics",
        data: [202, 2032, 2302, 2012, 2022],
      },
    ],
  });

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','july','august'],
    datasets: [
      {
        label: "",
        data: [0, 10,20, 10, 26, 20, 29,27],
        fill: true,
        backgroundColor: 'transparent',
        borderColor: '#0075FF',
        tension:0.5,
        pointRadius: 0
      }
    ],
  };

  const options = {
    scales:{
        x:{
            grid: {
                display: false
            }
        }
    }
  }
      
      return (
        <>
            <Line ref={chartRef} data={data} options={options}/>
        </>
      )
    
}

export default chart