import {Link} from "react-router-dom"
import { useState } from "react"
import darkMode from "/darkmode.png"
import logoutImg from "/logoutimg.png"
import aboutImg from "/Aboutimg.png"
import datapolicy from "/datapolicy.png"
import "./settings.css"
import { style } from "@mui/system"
const SetingsPage = ()=>{

    const [darkmode, setDarkMode] = useState(false)

    const toggleDarkMode = ()=>{
            setDarkMode(true)
    }

    
    // if(darkmode){
    //     document.body.classList.add('darkMode');
    //     // document.getElementById('maincontainer').style.background='#0F1E30'
    //     // document.getElementById('dark').style.background='#001833'
    // }
    // else{
    //     document.body.classList.remove('darkMode')
    // }

    const setdarkMode = ()=>{
        document.querySelector("body")?.setAttribute("class","dark")
    }
    const setLightMode = ()=>{
        document.querySelector("body")?.setAttribute("class","light")
    }
    return(
        <div className="settingsContainer">
            <div className="settings-header">
                <h3>Settings</h3>
            </div>

            <div className="settingsContentContainer">
                    <div className="color-theme">
                        <h4>Change the color theme to: </h4>
                        <button type="button" className="dark" style={{background:'#333',color:'#fff',cursor:'pointer'}} onClick={setdarkMode}><img src={darkMode}/>Dark mode</button>
                        <button type="button" className="light" style={{background:'#fff',border:'1px solid #0000ff',cursor:'pointer'}} onClick={setLightMode}>Light mode</button>
                    </div>
                    <div className="language">
                        <h4>Language</h4>
                        <label htmlFor="select" style={{marginLeft:'1%'}}>Choose language</label>
                        <select id="select" style={{marginLeft:'2%'}}>
                            <option value="english">English</option>
                            <option value="french">French</option>
                            <option value="kinyarwanda">Kinyarwanda</option>
                        </select>
                    </div>

                    <div className="data-policy">
                        
                            <button type="button" className="button-data-policy">
                                <Link to={"/data_policy"} style={{padding:'1%',textDecoration:'none'}}>
                                    Data policy
                                </Link>

                            </button>
                    </div>

                    <div className="terms-of-service" >
                            <button className="terms-of-services">
                                <Link to={"/terms_of_Service"} style={{width:'100%',height:'100%',padding:'1%',display:'flex',alignItems:'center',textDecoration:'none'}}>
                                        terms of service
                                </Link>
                            </button>
                    </div>
                    <div className="about" >
                            <button className="about-button">
                                <Link to={"/about"} style={{width:'100%',height:'100%',padding:'1%',display:'flex',alignItems:'center',textDecoration:'none'}}>
                                        <img src={aboutImg} style={{width:'20%'}}/>about
                                </Link>
                            </button>
                    </div>
                    <div className="about" >
                    <button className="about-button">
                        <Link to={"/feedback"} style={{width:'100%',height:'100%',padding:'1%',display:'flex',alignItems:'center',textDecoration:'none'}}>
                               feedback
                        </Link>
                    </button>
            </div>
                    <div className="logout" >
                            <button type="button" className="logout-button">
                                <Link to={"/logout"} style={{width:'100%',height:'100%',padding:'1%',display:'flex',alignItems:'center',textDecoration:'none'}}>
                                        <img src={logoutImg} style={{width:'20%'}}/>Logout
                                </Link>
                            </button>
                    </div>
                </div>
        </div>
    )
}
export default SetingsPage