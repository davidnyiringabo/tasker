import "./login.css"
import {Link} from "react-router-dom"
import Logo from "/Logo.png"
import axios from "axios"
import { ChangeEvent } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import {useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const formemail = "nyiringabodavid@gmail.com"

const Login = ()=>{

    const [formEmail, setFormEmail] = useState("hello")
    
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        email:'',
        password:''
      })

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        const email = formData.email
        setFormEmail(email)
      };
    //   console.log(formData)

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        axios.post('http://localhost:7100/v1/api/login',formData)
                .then((response)=>{
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
                          navigate("/main")
                        },1000)

                   
                      }
                      else{
                        toast.error('Invalid email. please create account', {
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
                })
                .then((response)=>{
                    console.log(response)
                    setFormEmail(formData.email)
                    console.log(formEmail)

                    document.cookie = `email=${formEmail}`
                }
                )
                .catch((err)=>{
                    toast.error('You are not authorised, invalid password', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                        console.log(err)
                })
    }


    return(

        <div className='overall-container'>
            <div className="header">
                <img src={Logo} className="logo-img"/>
                <h1>Tasker</h1>
            </div>

            <div className="mainContainer">
           
                <header>Welcome back</header>
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
                        <Link to="forgotPassword" className="forgotPasswordLink"><button type="button" className="forgotPasswordButton">forgot password</button></Link>
                    </div>

                    <button type="submit" className="submit">Login</button>

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