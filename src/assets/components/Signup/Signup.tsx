import "../Login/login.css"
import {Link} from "react-router-dom"
import Logo from "/Logo.png"
import { useState ,CSSProperties } from "react"
import { toast } from "react-toastify"
import {useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import GridLoader from "react-spinners/GridLoader";
import axios from "axios"
const baseurl = "https://tasker-jbnc.onrender.com"

const Signup = ()=>{

    const navigate = useNavigate()
    const [formEmail,setFormEmail] = useState("");
    const [formData,setFormData] = useState({
        username:'',
        email:'',
        password:''
      })
      let [loading, setLoading] = useState(false)
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
        axios.post(`${baseurl}/v1/api/signup`,formData)
                .then((response)=>{
                  setLoading(false)
                    if(response.status === 200){
                        toast.success("User created successfully", {
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
                    else if(response.data.code === 11000){
                    setLoading(false)
                    toast.error('That account already exists.Log in or create new.', {
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

                  document.cookie = `email=${formEmail}`
                 })
                    
                .catch((err)=>{
                    console.log(err)
                    if(err.response.data.code === 11000){
                  setLoading(false)
                        toast.error('That account already exists.Log in or create new.', {
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
                      else{
                  setLoading(false)
                        toast.error("Internal Server Error", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            })
                      }                  
                })
    }

    const override: CSSProperties = {
      display: "inline",
      margin: "auto",
      borderColor: "red",
    }

    return(

        <div className='overall-container'>
                <div className="header">
                    <img src={Logo} className="logo-img"/>
                    <h1>Tasker</h1>
                </div>
            
                <div className="mainContainer">
                <header>Create account</header>
                <form className="signupForm" onSubmit={handleSubmit}>

                    <div className="form-control">
                        <label htmlFor="name">Full name: </label>
                        <input type="text" value={formData.username} onChange={handleChange} name="username" id="name" placeholder="Your name" required/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="email">Email: </label>
                        <input type="email"  value={formData.email} onChange={handleChange} name="email" id="email" placeholder="e.g john@gmail.com" required/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password: </label>
                        <input type="password"  value={formData.password} onChange={handleChange} name="password" id="password" placeholder="Your password" required/>
                    </div>

                    <button type="submit" className="submit"> { !loading? "Create account" :  <GridLoader color={ "#fff"} cssOverride={override} loading={loading} size={5} /> }   </button>

                    <div className="footer">
                        <h5>Have account ? </h5>
                        <Link to={"/login"}>Login</Link>
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

export default Signup