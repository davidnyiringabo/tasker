import TasksComponents from "../../TasksComponets"
import "./calender.css"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { makeStyles } from '@material-ui/core/styles';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  calendar: {
    width: '100%',
    height:'100%',
  },
});



const CalendarPage = ()=>{
    const classes = useStyles()
    return(
        <div className="overviewContainer">

                <div className="overviewTasksContainer" style={{height:'100%'}}>
                    <div className='calendar-header'>
                      <h3>View your tasks according to calendar</h3>
                    </div>
                     
                    <div className="calenderPlaceholder">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar classes={{root:classes.calendar}}/>
                        </LocalizationProvider>
                    </div>
                   <TasksComponents/>
                </div>

        </div>
    )
}
export default CalendarPage