import { useState, useEffect } from "react"
import tick from "/check-circle.png"
import check from "/check.png"
import cross from "/x.png"
import dot from "/dot.png"
import trash from "/trash-2.png"
import "./taskscomponents.css"
import axios from "axios"
import AllTasks from "./AllTasks"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import { ToastContainer } from "react-toastify"

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
  timestamp: number;
}

const TasksContainer = ({tasks}:Props)=>{

    const handledeleteTask = (id:any)=>{
      axios.get(`https://tasker-jbnc.onrender.com/v1/api/deleteTask/${id}`)
          .then((response)=>{
          console.log(response.data)
          })
          setTimeout(()=> window.location.reload(),3000)
          toast.success("deleted successfully",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored"
          })             
    }
    const handlecompletedTasks=(id:any)=>{
      axios.put(`https://tasker-jbnc.onrender.com/v1/api/updateAscompleted/${id}`)
        .then(response=>{
          console.log(response)
          toast.success(response.data,{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })

          window.location.reload()
        })
    }
    const firstTasks = [ tasks[0], tasks[1]]
    return(
        <div className='overviewTasksContainer'>
                    {tasks.length > 1 ? firstTasks.map((task:any)=>{
                      return(
                    
                        <div className='singleTask'>
                            <div className='single-task-upper'>
                              <h3>{task.description}</h3>
                              <h3>Completed {task.completed ? <img src={check}/> : <img src={cross}/> }</h3>
                            </div>
                            <h4>Set on {task.deadline_day} {task.deadline_time}</h4>
                            <div className='taskCategory'>
                              <img src={dot}/>
                              <h6>{task.category}</h6>
                            </div>
                            <div className="single-task-bottom">
                              <div className="single-task-bottom-left">
                                <h5>Deadline</h5>
                                <h6> {task.deadline_day} at {task.deadline_time}</h6>
                              </div>
                              <div className="single-task-bottom-right">
                                <button type='button' style={{border:'1px solid #0075FF',color:'#0075FF'}} onClick={()=> handlecompletedTasks(task._id)}><img src={tick}/> Complete</button>
                                <button type='button' style={{border:'1px solid #BA4A4A',color:'#BA4A4A'}} onClick={()=> handledeleteTask(task._id)}><img src={trash}/> Remove</button>
                              </div>
                            </div>
                        </div>
                       
                       )
                    } ) : tasks.length ==1 ?
                          
                         <div className='singleTask'>
                            <div className='single-task-upper'>
                              <h3>{tasks[0].description}</h3>
                              <h3>Completed {tasks[0].completed ? <img src={check}/> : <img src={cross}/> }</h3>
                            </div>
                            <h4>Set on {tasks[0].deadline_day} {tasks[0].deadline_time}</h4>
                            <div className='taskCategory'>
                              <img src={dot}/>
                              <h6>{tasks[0].category}</h6>
                            </div>
                            <div className="single-task-bottom">
                              <div className="single-task-bottom-left">
                                <h5>Deadline</h5>
                                <h6> {tasks[0].deadline_day} at {tasks[0].deadline_time}</h6>
                              </div>
                              <div className="single-task-bottom-right">
                                <button type='button' style={{border:'1px solid #0075FF',color:'#0075FF'}} onClick={()=> handlecompletedTasks(tasks[0]._id)}><img src={tick}/> Complete</button>
                                <button type='button' style={{border:'1px solid #BA4A4A',color:'#BA4A4A'}}  onClick={()=> handledeleteTask(tasks[0]._id)}><img src={trash}/> Remove</button>
                              </div>
                            </div>
                        </div> : <h3 className="no-task">There is no task yet</h3>
                          }

                          <ToastContainer 
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="colored"
                          />
                  </div>
    )
}

export default TasksContainer