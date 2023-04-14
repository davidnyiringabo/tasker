import TasksComponents from "../../TasksComponets"
import "./calender.css"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

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
  timestamp: number
}

const CalendarPage = ({tasks}:Props)=>{
    return(
        <div className="overviewContainer">

                <div className="overviewTasksContainer" style={{height:'100%'}}>
                    <div className='calendar-header'>
                      <h3>View your tasks according to calendar</h3>
                    </div>
                     
                    <div className="calenderPlaceholder">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar />
                        </LocalizationProvider>
                    </div>
                   <TasksComponents tasks={tasks}/>
                </div>

        </div>
    )
}
export default CalendarPage
