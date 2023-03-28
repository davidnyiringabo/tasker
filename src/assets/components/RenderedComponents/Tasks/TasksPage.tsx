import "./tasksPage.css"
import TasksComponents from "../../TasksComponets"
const TasksPage = ()=>{

        const dateOb = new Date();
        const todayDateNumber = dateOb.getDay()
        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        const monthsOfYeah = ["January","February","March","April","May","June","July","August","September","October","November","December"]

        const today = weekDays[todayDateNumber];
        const todayDate = dateOb.getDate();
        const thisMonthNumber = dateOb.getMonth();
        const thisMonth = monthsOfYeah[thisMonthNumber]
        const thisyeah = dateOb.getFullYear()
    return(
        <div className="taskViewContainer" style={{width:"100%",display:"flex",flexDirection:"column",gap:'1rem'}}>
            <div className="overviewContainer" style={{height:'40%'}}>
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

                <div className="overviewTasksContainer">
                    <div style={{width:"90%",padding:"0.9% 0",textAlign:'left'}}>
                      <h3>All tasks</h3>
                    </div>                     

                   <TasksComponents/>
                </div>

            </div>
    )
}
export default TasksPage