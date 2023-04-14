import "./feedback.css"
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"
const FeedbackPage = ()=>{


    const email = document.cookie.split("=")[1]
    const [formData,setFormData] = useState({
        email: email,
        feedback:''
      })
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleSubmit = (e:any)=>{
        e.preventDefault();
        axios.post('http://localhost:7200/v1/api/notification',formData)
                .then((response)=>{
                    if(response.status === 200){
                        toast.success("feedback sent! Thanks", {
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
                .catch(()=>{
                        toast.error('Feedback not sent!', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          });                  
                })
    }
    return(
        <div className="feedback-page-container">
            <h3>We would like to your feedback to improve this application</h3>
            <div className="feedback-page-content">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="page-header">
                        <h4>What is your opinion on Tasker</h4>
                        <div className="bottom-page">
                            <button type="button" value={"very_bad"}> <span role="img" aria-label="bad">☹️</span></button>
                            <button type="button" value={"not_good"}>😕</button>
                            <button type="button" value={"neutral"}>😐</button>
                            <button type="button" value={"cool"}>😀</button>
                            <button type="button" value={"very_cool"}>🥰</button>

                        </div>
                    </div>
                    <div className="feedback-middle">
                        <label htmlFor="feedback">Please leave your feedback below</label>
                        <textarea name="feedback" id="feedback" maxLength={600} placeholder="Your feedback" value={formData.feedback} onChange={(e)=>handleChange(e)}></textarea>
                    </div>
                    <div className="feedback-bottom">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>       
        </div>
    )
}

export default FeedbackPage