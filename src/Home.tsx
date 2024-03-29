import Logo from "/Logo.png"
import "./gStyles/home.css"
import {Link,NavLink, useNavigate} from "react-router-dom"
import Check from "/check-circle.png"
import overview from "/chart-column-solid1.png"
import tasksImg from "/Group5.png"
import calender from "/calendar.png"
import user from "/user.png"
import settings from "/settings.png"
import settingsTopImg from "/settings(1).svg"
import plus from "/plus.png"
import NotifiImg from "/bell.png"
import SearchButton from "/search.png"
import menuIcon from "./assets/menu.png"
import userIcon from "./assets/user.png"
import profilePic from "/profileavatar.png"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState,useEffect, ReactNode, SetStateAction } from "react"
import crossx from "/x-circle.png"
import axios from "axios"
import {toast} from "react-toastify"
import { CSSProperties } from "react"
import { HashLoader } from "react-spinners"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {baseurl} from "./data/api"

interface Props{
    children: ReactNode,
    tasks: Task[],
    selectedButton: []
}

interface Task {
    _id: String;
    description: string;
    completed: boolean;
    deadline_day: string;
    deadline_time: string;
    category: string;
    timestamp: number;
}

const selected = document.getElementsByTagName('button');
const selectedButton = Array.from(selected).filter((single)=> single.getAttribute('aria-selected') === 'true');

const Home = ({children, tasks, selectedButton}: Props)=>{
    const [client, setClient] = useState({
        _id: '',
        username: '',
        email: '',
        password:'',
        about:''
    })
    const navigate = useNavigate()
    const userLogginEmail = localStorage.getItem("taskerUserEmail")

    const [openModel, setOpenModel] = useState(false)
    
    const toggleModel = ()=>{
        setOpenModel(!openModel)
    }

    const closeModel = ()=>{
        setOpenModel(!openModel)
    }

    if(openModel){
        document.body.classList.add('active-model')
    }else{
        document.body.classList.remove('active-model')
    }

    const [addTaskFormData, setAddTaskFormData] = useState({
        description: '',
        category: '',
        deadline_day: '',
        deadline_time: '',
        email: userLogginEmail,
        timestamp: Date.now(),
        completed: false
    })

    const handleAddTaskSubmit = (e:any)=>{
        e.preventDefault()
        setTimeout(()=> window.location.reload(), 4000)
        axios.post(`${baseurl}/v1/api/createTask`,addTaskFormData)
            .then((response: any )=>{
                
                response.status == 200 ? 
                toast.success("task added", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                toast.error("There was an error in creating the task", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })

            })
            .catch((err: any)=>{
            })
    }

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setAddTaskFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }))

      }
    const [loading, setloading] = useState(false)

    useEffect( ()=>{
    
     if(!userLogginEmail){
        navigate("/login")
     }

     axios.get(`${baseurl}/v1/api/getUser/${userLogginEmail}`)
            .then((response: { data: SetStateAction<{ _id: string; username: string; email: string; password: string; about: string }> })=>{
                setClient(response.data)
            })
            // .catch(()=>{
            // })
    },[userLogginEmail])

    const dateOb = new Date()
    const day = dateOb.getDate()
    const month = dateOb.getMonth()
    const year = dateOb.getFullYear()

    const date = `${year}-0${month+1}-${day}`
    const tasksForToday = tasks.filter(task=>{
        return task.deadline_day == date
    })
    const first4Tasks = [tasks[0],tasks[1],tasks[2],tasks[3]];
    const first3Tasks = [tasks[0],tasks[1],tasks[2]];
    const first2Tasks = [tasks[0],tasks[1]];

    const [search, setSearch] = useState("")

    const handleSearch = (e:any)=>{
        setSearch(e.target.value)
    }
      const closeModelAndSubmit = ()=>{
        setTimeout(()=> setOpenModel(!openModel),100)
        handleAddTaskSubmit(Event)

    }

    const [openCalendarMenu, setOpenCalendarMenu] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    return(
        <div className="container-main" >
            <div className="sidebar-left"> 
                <div className="sidebar-header">
                    <Link to={"/main"}>
                        <img src={Logo} style={{width:'100%'}}/>
                    </Link>
                    <h4>Tasker</h4>

                </div>

                <div className="button-container">
                    <div className="side-upper">
                        <NavLink to="/main/overview" className="link"> <button type="button" className="overview side-button"><img src={overview}/><p>Overview</p></button></NavLink>
                        <NavLink to="/main/tasks" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}><button type="button" className="tasks side-button"><img src={tasksImg}/><p>Tasks</p></button></NavLink>
                        <NavLink to="/main/calendar" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}><button type="button" className="calender side-button"><img src={calender}/><p>Calender</p></button></NavLink>
                    </div>

                    <div className="side-middle">
                        <button type="button" className="add_tasks side-button-middle" onClick={toggleModel}><img src={plus}/><p>add task</p></button>
                    </div>

                    <div className="side-bottom">
                        <NavLink to="/main/account" className="link-bottom"><button type="button" className="account side-button-bottom"><img src={user}/><p>Account</p></button></NavLink>
                        <NavLink to="/main/settings" className="link-bottom"><button type="button" className="settings side-button-bottom"><img src={settings}/><p>Settings</p></button></NavLink>
                    </div>
                </div>
            </div>

            {openModel && (
                <div className="modelContainer">
                    <div className="overlay">
                        <div className="addTaskmodelContent">
                            <div className="add-task-model-header">
                                <h2>New task</h2>
                                <button type="button"><img src={crossx} onClick={closeModel}/></button>
                            </div>

                            <div className="addTaskFormContainer">
                                <form className="addTaskForm" onSubmit={handleAddTaskSubmit}>
                                    <div className="description">
                                        <label htmlFor="description">Description</label>
                                        <input type="text" name="description" value={addTaskFormData.description} onChange={handleChange} id="description" placeholder="What's the task about?" required/>
                                    </div>

                                    <div className="category">
                                        <label htmlFor="category">Choose a category</label>
                                        <select name="category" id="category" value={addTaskFormData.category} onChange={handleChange} required>
                                            <option value="select">--select---</option>
                                            <option value="work">Work</option>
                                            <option value="learning">Learning</option>
                                            <option value="home">Home</option>

                                        </select>
                                    </div>

                                    <div className="deadline">
                                        <label htmlFor="deadline">Deadline</label>
                                        <input type="date" name="deadline_day" value={addTaskFormData.deadline_day} onChange={handleChange} id="deadline" placeholder="choose a date" required/>
                                        <input type="time" name="deadline_time" value={addTaskFormData.deadline_time} onChange={handleChange} id="deadline" placeholder="choose a time" required/>

                                    </div>

                                    <button type="submit" className="addTaskSubmit" onClick={closeModelAndSubmit}>Finish</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}               

            <div className="container-right" id="maincontainer">
                {/* -----------------------THIS IS GOING TO BE DYNAMICALLY RENDERED----------------------------------- */}
                <div className="hero-container">
                    <div className="sml-scr-header">
                        <div className="sidebar-header2">
                            <Link to={"/main"}>
                                <img src={Logo} style={{width:'100%'}}/>
                            </Link>
                            <h4>Tasker</h4>
                        </div>
                        <div style={{width: "19%",display: "flex", justifyContent: "space-between"}}>
                            <img src={menuIcon} width={30} height={25} onClick={()=> setOpenMenu(!openMenu)}/>
                            <img src={userIcon} width={25} height={25} onClick={()=> setOpenCalendarMenu(!openCalendarMenu)}/>
                        </div>

                    </div>
                    <div className="naigationBar">
                        <div className="searchContainer">
                            <a href={`https://www.google.com/search?q=${search}`} target={"_blank"}><img src={SearchButton}/></a>
                            <input type="search" name="search" id="dark" onChange={(e)=>handleSearch(e)} className="searchplacehd" placeholder="Search something" />
                        </div>
                    
                        <div className="notificationsTop" id="dark">
                            <Link to={"/main/notifications"}><img src={NotifiImg}/></Link>
                        </div>
                        <div className="settingsTop" id="dark">
                            <Link to={"/main/settings"}> <img src={settingsTopImg}/></Link>
                           
                        </div>
                    </div>
                    <div className="renderedpageContainer">
                         {children}
                    </div>
                </div>
                {/* ---------------------------------------------------------------------------------------------------------- */}

                <div className="right-side-container">
                    <div className="upper-card">
                        <img src={profilePic}/>
                        <h3>{client.username}</h3>
                        <h6>{`${client.about ? client.about : "No description added yet"}`}</h6>
                    </div>
                    <div className="calendar-container">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
                        </LocalizationProvider>
                    </div>
                    <div className="recent-tasks">
                        <h4 className="recent-tasks-header">Tasks for today</h4>
                        {tasksForToday.length >= 4? tasksForToday.map(task=>{
                            return(
                               <div className="single-recent-task">
                                    <img src={Check}/>
                                    <h5>{task.description}</h5>
                                    <h6>at {task.deadline_time}</h6>

                                </div>
                            )
                        }):
                        tasksForToday.length == 3? tasksForToday.map(task=>{
                            return(
                                <div className="single-recent-task">
                                    <img src={Check}/>
                                    <h5>{task.description}</h5>
                                    <h6>at {task.deadline_time}</h6>
                                </div>
                            )

                        }):
                        tasksForToday.length == 2? tasksForToday.map(task=>{
                            return(
                                <div className="single-recent-task">
                                    <img src={Check}/>
                                    <h5>{task.description}</h5>
                                    <h6>at {task.deadline_time}</h6>
                                </div>
                            )
                        }):
                        tasksForToday.length == 1?  
                        <div className="single-recent-task">
                            <img src={Check}/>
                            <h4>{tasksForToday[0].description}</h4>
                            <h6>at {tasksForToday[0].deadline_time}</h6>
                           </div>
                        :<h3>There is no task for today</h3>
                    }
                    </div>
                </div>

                {openMenu && (
                    <div className="smll-sidebar-left"> 
                        <div className="sidebar-header">
                            <Link to={"/main"}>
                                <img src={Logo} style={{width:'100%'}}/>
                            </Link>
                            <h4 style={{display: "inline"}}>Tasker</h4>
        
                        </div>

                        <div className="button-container">
                            <div className="side-upper">
                                <NavLink to="/main/overview" className="link"> <button type="button" className="overview side-button"><img src={overview} className="smll-scrn-nvimg"/><h6>Overview</h6></button></NavLink>
                                <NavLink to="/main/tasks" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}><button type="button" className="tasks side-button"><img src={tasksImg} className="smll-scrn-nvimg"/><h6>Tasks</h6></button></NavLink>
                                <NavLink to="/main/calendar" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}><button type="button" className="calender side-button"><img src={calender} className="smll-scrn-nvimg"/><h6>Calender</h6></button></NavLink>
                            </div>
        
                            <div className="side-middle">
                                <button type="button" className="add_tasks side-button-middle" onClick={toggleModel}><img src={plus}/><h6>add task</h6></button>
                            </div>
        
                            <div className="side-bottom">
                                <NavLink to="/main/account" className="link-bottom"><button type="button" className="account side-button-bottom"><img src={user} className="smll-scrn-nvimg"/><h6>Account</h6></button></NavLink>
                                <NavLink to="/main/settings" className="link-bottom"><button type="button" className="settings side-button-bottom"><img src={settings} className="smll-scrn-nvimg"/><h6>Settings</h6></button></NavLink>
                            </div>
                        </div>
                    </div>
                )}

                {openCalendarMenu && (
                    <div className="small-right-side-container">
                        <div className="upper-card">
                            <img src={profilePic}/>
                            <h3>{client.username}</h3>
                            <h6>{`${client.about ? client.about : "No description added yet"}`}</h6>
                        </div>
                        <div className="calendar-container">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
                            </LocalizationProvider>
                        </div>
                        <div className="recent-tasks">
                            <h4 className="recent-tasks-header">Tasks for today</h4>
                            {tasksForToday.length >= 4? tasksForToday.map(task=>{
                                return(
                                <div className="single-recent-task">
                                        <img src={Check}/>
                                        <h5>{task.description}</h5>
                                        <h6>at {task.deadline_time}</h6>

                                    </div>
                                )
                            }):
                            tasksForToday.length == 3? tasksForToday.map(task=>{
                                return(
                                    <div className="single-recent-task">
                                        <img src={Check}/>
                                        <h5>{task.description}</h5>
                                        <h6>at {task.deadline_time}</h6>
                                    </div>
                                )

                            }):
                            tasksForToday.length == 2? tasksForToday.map(task=>{
                                return(
                                    <div className="single-recent-task">
                                        <img src={Check}/>
                                        <h5>{task.description}</h5>
                                        <h6>at {task.deadline_time}</h6>
                                    </div>
                                )
                            }):
                            tasksForToday.length == 1?  
                            <div className="single-recent-task">
                                <img src={Check}/>
                                <h4>{tasksForToday[0].description}</h4>
                                <h6>at {tasksForToday[0].deadline_time}</h6>
                            </div>
                            :<h3>There is no task for today</h3>
                        }
                        </div>
                    </div>
                )}

            </div>
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


export default Home;
