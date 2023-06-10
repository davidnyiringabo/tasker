import { useState, useEffect } from "react"
import tick from "/check-circle.png"
import check from "/check.png"
import cross from "/x.png"
import dot from "/dot.png"
import trash from "/trash-2.png"
import "./taskscomponents.css"
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import Homedot from "/homedot.png"
import learningdot from "/learningdot.png"
import {baseurl} from "../../data/api"



interface Task {
  _id: String;
  description: string;
  completed: boolean;
  deadline_day: string;
  deadline_time: string;
  category: string;
  timestamp: number
}

interface Props{
  tasks: Task[]
}

const AllTasks = ({tasks}:Props)=>{
  const[promptTheUserModel, setPromptTheUserModel] = useState(false)

    const handlecompletedTasks=(task:any)=>{
    !task.completed ?  
      axios.put(`${baseurl}/v1/api/updateAscompleted/${task._id}`)
            .then(response=>{
              // console.log(response)
              toast.success(response.data,{
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
          })
          setTimeout(()=> window.location.reload ,2500)
            }) : 
              toast.error("Already completed",{
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
    })
  }

  const handledeleteTask = (id:any)=>{
    axios.get(`${baseurl}/v1/api/deleteTask/${id}`)
        .then((response)=>{
        // console.log(response.data)
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

    return(
                  <div className='viewAllTasksContainer'>
                    {tasks.length > 1 ? tasks.map((task:any)=>{
                      return(
                    
                        <div className='singleTask'>
                            <div className='single-task-upper'>
                              <h3>{task.description}</h3>
                              <h3>Completed {task.completed ? <img src={check}/> : <img src={cross}/> }</h3>
                            </div>
                            <h4>Set on {task.deadline_day} {task.deadline_time}</h4>
                            <div className='taskCategory'>
                              <img src={learningdot}/>
                              <h6>{task.category}</h6>
                            </div>
                            <div className="single-task-bottom">
                              <div className="single-task-bottom-left">
                                <h5>Deadline</h5>
                                <h6>{task.deadline_day} {task.deadline_time}</h6>
                              </div>
                              <div className="single-task-bottom-right">
                                <button type='button' style={{border:'1px solid #0075FF',color:'#0075FF'}}  onClick={()=> handlecompletedTasks(task)}><img src={tick}/> Complete</button>
                                <button type='button' style={{border:'1px solid #BA4A4A',color:'#BA4A4A'}} onClick={()=>handledeleteTask(task._id)}><img src={trash}/> Remove</button>
                              </div>
                            </div>
                        </div>
                       
                    )
                    } ) : tasks.length ==1 ? (
                          (
                         <div className='singleAlltask'>
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
                                <button type='button' style={{border:'1px solid #0075FF',color:'#0075FF'}}  onClick={()=> handlecompletedTasks(tasks[0])}><img src={tick}/> Complete</button>
                                <button type='button' style={{border:'1px solid #BA4A4A',color:'#BA4A4A'}} onClick={()=> handledeleteTask(tasks[0]._id)}><img src={trash}/> Remove</button>
                              </div>
                            </div>
                        </div>
                      )
                      ) : <h3 className="no-task">There is no task yet</h3>}

                      <h6 className="heading-for-viewtasks">So far you've sheduled {tasks.length} {`${tasks.length == 1 ? 'task' : 'tasks'}`}</h6>


                      {promptTheUserModel && (
                          <div className="modelContainer">
                              <div className="overlay">
                                  <div className="viewTasksmodelContent">
                                      <div className="view-task-model-header">
                                          <h2 style={{color:"#fff"}}>All tasks</h2>
                                          <button type='button' onClick={()=>setPromptTheUserModel(!promptTheUserModel)} className="close-view-all-tasks-model">close</button>
                                      </div>
                                  <div className="alltaskscontainer">
                                      <AllTasks tasks={tasks}/>
                                  </div>
                                  </div>
                              </div>
                          </div>                         
                        )
                      }
                  </div>

    )}

export default AllTasks