import Logo from "/Logo.png"
import "./home.css"
import {BrowserRouter as Router, Routes, Route,Link} from "react-router-dom"
import Page from "./assets/components/RenderedComponents/Calendar/Calendar"
import Check from "./assets/components/RenderedComponents/Tasks/TasksPage"
import overview from "/chart-column-solid1.png"
import tasksImg from "/Group5.png"
import calender from "/calendar.png"
import user from "/user.png"
import settings from "/settings.png"
import settingsTopImg from "/settings(1).svg"
import plus from "/plus.png"
import NotifiImg from "/bell.png"
import SearchButton from "/search.png"
import profilePic from "/profileavatar.png"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState,useEffect, ReactNode } from "react"
import crossx from "/x-circle.png"
import axios from "axios"


interface Props{
    children: ReactNode;
}

const Sidebars = ({children}: Props)=>{

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
        deadline:''
    })

    const handleAddTaskSubmit = ()=>{
            axios.post("http://localhost:7100/v1/api/createTask",addTaskFormData)
                        .then((response)=>{
                            console.log(response.data)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddTaskFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));

        console.log(addTaskFormData)
      };
 
    return(
        <div className="container-main" >
            <div className="sidebar-left"> 
                <div className="sidebar-header">
                    <Link to={"/main"} style={{width:'50%',marginRight:'-10%'}}>
                        <img src={Logo} style={{width:'100%'}}/>
                    </Link>
                    <h4>Tasker</h4>

                </div>

                <div className="button-container">
                    <div className="side-upper">
                    <Link to="/main/overview" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}> <button type="button" className="overview active side-button"><img src={overview}/>Overview</button></Link>
                    <Link to="/main/tasks" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}><button type="button" className="tasks side-button"><img src={tasksImg}/>Tasks</button></Link>
                    <Link to="/main/calendar" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}><button type="button" className="calender side-button"><img src={calender}/>Calender</button></Link>
                    </div>

                    <div className="side-middle">
                    <button type="button" className="add_tasks side-button-middle" onClick={toggleModel}><img src={plus}/>add task</button>
                    </div>

                    <div className="side-bottom">
                    <Link to="/main/account" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}><button type="button" className="account side-button-bottom"><img src={user}/>Account</button></Link>
                    <Link to="/main/settings" className="link" style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',textDecoration:'none'}}><button type="button" className="settings side-button-bottom"><img src={settings}/>Settings</button></Link>
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
                                <form className="addTaskForm" method="post" onSubmit={handleAddTaskSubmit}>
                                    <div className="description">
                                        <label htmlFor="description">Description</label>
                                        <input type="text" name="description" value={addTaskFormData.description} onChange={handleChange} id="description" placeholder="What's the task about?"/>
                                    </div>

                                    <div className="category">
                                        <label htmlFor="category">Choose a category</label>
                                        <select name="category" id="category" value={addTaskFormData.category} onChange={handleChange}>
                                            <option value="work">Work</option>
                                            <option value="learning">Learning</option>
                                            <option value="home">Home</option>

                                        </select>
                                    </div>

                                    <div className="deadline">
                                        <label htmlFor="deadline">Description</label>
                                        <input type="date" name="deadline" value={addTaskFormData.deadline} onChange={handleChange} id="deadline" placeholder="choose a date"/>
                                    </div>

                                    <button type="submit" className="addTaskSubmit">Finish</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                

            <div className="container-right" id="maincontainer">
                {/* -----------------------THIS IS GOING TO BE DYNAMICALLY RENDERED----------------------------------- */}
                <div className="hero-container">
                    <div className="naigationBar">
                        <div className="searchContainer">
                            <a href="https://www.google.com/search?q=search_something" target={"_blank"}><img src={SearchButton}/></a>
                            <input type="search" name="search" id="dark" className="searchplacehd" placeholder="Search something" />
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
                        <h3>Samantha Cartel</h3>
                        <h6>Senior front-end developer at google</h6>
                    </div>
                    <div className="calendar-container">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
                        </LocalizationProvider>
                    </div>
                    <div className="recent-tasks">
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Sidebars;