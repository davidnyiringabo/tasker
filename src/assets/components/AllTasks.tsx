import { useState, useEffect } from "react"
import tick from "/check-circle.png"
import cross from "/x.png"
import dot from "/dot.png"
import trash from "/trash-2.png"
import "./taskscomponents.css"
import axios from "axios"

const AllTasks = ()=>{
  const cookie= document.cookie.split('=')
  const userLogginEmail = cookie[1]
  const[promptTheUserModel, setPromptTheUserModel] = useState(false)

  console.log(userLogginEmail)

    const [tasks,setTasks] = useState([
    ]);

    useEffect( ()=>{

      axios.get(`http://localhost:7100/v1/api/tasks/${userLogginEmail}`)
             .then((response)=>{
              const userTasks = response.data

              setTasks(userTasks)
              console.log(response.data)

             })
    },[userLogginEmail])
    const firstTasks = [tasks[0],tasks[1]]

    return(
        <div className='viewAllTasksContainer'>
                    {tasks.length > 1 ? tasks.map((task:any)=>{
                      return(
                    
                        <div className='singleTask'>
                            <div className='single-task-upper'>
                              <h3>{task.description}</h3>
                              <h3>Completed {task.completed ? <img src={tick}/> : <img src={cross}/> }</h3>
                            </div>
                            <h4>Set on {task.deadline}</h4>
                            <div className='taskCategory'>
                              <img src={dot}/>
                              <h6>{task.category}</h6>
                            </div>
                            <div className="single-task-bottom">
                              <div className="single-task-bottom-left">
                                <h5>Deadline</h5>
                                <h6> today at {task.deadline}</h6>
                              </div>
                              <div className="single-task-bottom-right">
                                <button type='button' style={{border:'1px solid #0075FF',color:'#0075FF'}}><img src={tick}/> Complete</button>
                                <button type='button' style={{border:'1px solid #BA4A4A',color:'#BA4A4A'}}><img src={trash} onClick={()=>setPromptTheUserModel(true)}/> Remove</button>
                              </div>
                            </div>
                        </div>
                       
                    )
                    } ) : tasks.length ==1 ? (
                          (
                         <div className='singleAlltask'>
                            <div className='single-task-upper'>
                              <h3>{tasks[0].description}</h3>
                              <h3>Completed {tasks[0].completed ? <img src={tick}/> : <img src={cross}/> }</h3>
                            </div>
                            <h4>Set on {tasks[0].deadline}</h4>
                            <div className='taskCategory'>
                              <img src={dot}/>
                              <h6>{tasks[0].category}</h6>
                            </div>
                            <div className="single-task-bottom">
                              <div className="single-task-bottom-left">
                                <h5>Deadline</h5>
                                <h6> today at {tasks[0].deadline}</h6>
                              </div>
                              <div className="single-task-bottom-right">
                                <button type='button' style={{border:'1px solid #0075FF',color:'#0075FF'}}><img src={tick}/> Complete</button>
                                <button type='button' style={{border:'1px solid #BA4A4A',color:'#BA4A4A'}} onClick={()=>console.log("it is clicked")}><img src={trash}/> Remove</button>
                              </div>
                            </div>
                        </div>
                      )
                      ) : <h3>There is no task yet</h3>}

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
                                      <AllTasks />
                                  </div>

                                      
                                  </div>
                              </div>
                          </div>
                        )
                      }
                  </div>

    )}

export default AllTasks