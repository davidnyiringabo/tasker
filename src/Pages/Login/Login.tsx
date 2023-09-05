import "./login.css"
import {Link} from "react-router-dom"
import Logo from "/Logo.png"
import axios, { AxiosError } from "axios"
import { ChangeEvent, useEffect } from "react"
import { useState, CSSProperties } from "react"
import { toast } from "react-toastify"
import {useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import GridLoader from "react-spinners/GridLoader";
import {baseurl} from "../../data/api"
const formemail = "nyiringabodavid@gmail.com"

const Login = ()=>{

    const [formEmail, setFormEmail] = useState("")
    
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        email:'',
        password:''
      })
    useEffect(()=>{
      const email =  localStorage.getItem("taskerUserEmail")
      if(email){
        navigate("/main/overview")
      }
    },[])
    const [loading, setLoading] = useState(false)
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        const email = formData.email
        setFormEmail(email)
      };

    const handleSubmit = (e:any)=>{
        setLoading(!loading)
        e.preventDefault();
        axios.post(`${baseurl}/v1/api/login`,formData)
                .then((response)=>{
                    setLoading(false)
                    if(response.status == 200){
                        toast.success(response.data, {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          });      
              
                        setTimeout(()=>{
                          navigate("/main/overview")
                        },1000)

                   
                      }
                      else{
                        toast.error('Invalid email or password.', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          });
                      }

                      setFormEmail(formData.email)
                      localStorage.setItem('taskerUserEmail', formEmail)
                })
                .catch((err)=>{
                  setLoading(false)
                   AxiosError.ERR_NOT_SUPPORT ? 
                    toast.error("invalid email or password", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        })
                    :
                    toast.error("Internal error server", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                        // console.log(err)
                })
    }

    return(

        <div className='overall-container'>
            <div className="header">
                <img src={Logo} className="logo-img"/>
                <h1>Tasker</h1>
            </div>

            <div className="mainContainer">
           
                <header style={{display:"block"}}>Welcome back</header>
                <form className="loginForm" onSubmit={handleSubmit}>

                    <div className="form-control">
                        <label htmlFor="email">Email: </label>
                        <input type="email"  name="email" value={formData.email} onChange={(e)=>handleChange(e)} id="email" placeholder="Your email" required/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password: </label>
                        <input type="password"  name="password" value={formData.password} onChange={(e)=>handleChange(e)} id="password" placeholder="Your password" required/>
                    </div>

                    <div className="forgotPassword">
                        <Link to="forgot-password" className="forgotPasswordLink"><button type="button" className="forgotPasswordButton">forgot password ?</button></Link>
                    </div>

                    <button type="submit" className="submit">{ !loading? "Login" : <GridLoader color={"#fff"} loading={loading} size={6} />}</button>

                    <div className="footer">
                        <h5>Not yet joined ? </h5>
                        <Link to={"/signup"}>Create account</Link>
                    </div>

                </form>

   
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


export default Login