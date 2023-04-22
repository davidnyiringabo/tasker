import {Link, useNavigate} from "react-router-dom"
import "./forgot.css"
import axios from "axios"
import {toast, ToastContainer} from "react-toastify"
import { useState } from "react"
import GridLoader from "react-spinners/GridLoader";

const baseurl = "http://localhost:6500"


const ForgotPasswordPage = ()=>{
    const navigate = useNavigate()
    const [formEmail, setFormEmail] = useState(
        {email: ""}
    )
    const handleChange = (e:any)=>{
        setFormEmail({
            email: e.value
        })
    }

    const [displayResponse, setDisplayResponse] = useState(false)
    const [displayedText, setDisplayedText] = useState("Send email")
    const [loading, setLoading] = useState(false)
    const handleFormSubmit = (e:any)=>{
        e.preventDefault()
        setLoading(true)
        axios.post(`${baseurl}/v1/api/generateOTPSendEmail`,formEmail)
            .then((response)=>{
            setLoading(false)
            console.log(response)
            setDisplayedText("resend email")
            if(response.status == 200){
             setDisplayResponse(true)
             toast.success(`${response.data}`,{
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })
            } 
            else if( response.data.startsWidth == "No ") {
                setDisplayResponse(false)
                toast.error(`${response.data}`,{
                   position: "top-right",
                   autoClose: 2500,
                   hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: false,
                   draggable: true,
                   progress: undefined,
                   theme: "colored",
                   })
            }
             })
            .catch(()=>{
                setLoading(false)
                toast.error("There was an error in sending the email.try again",{
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })
            })

}
        return(
            <div className="forgot-password-page-wrapper">
                <div className="upper-container">
                    <h2>Reset your password</h2>
                    <h5>Write your email on which your account is registered</h5>
                    {displayResponse && (
                        <div className="displayed-content">
                            <h4>message is sent to {formEmail.email}. visit your email and continue with the process.</h4>
                        </div>
                    )}
                    <form onSubmit={()=>handleFormSubmit(event)}>
                        <input placeholder="write your email" name="email" onChange={(event)=> handleChange(event.target)} required/>
                        <button type="submit">{ !loading? `${displayedText}` : <GridLoader color={"#fff"} loading={loading} size={9} />}</button>
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

export default ForgotPasswordPage