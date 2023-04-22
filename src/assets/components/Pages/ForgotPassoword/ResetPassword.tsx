import {Link, useNavigate} from "react-router-dom"
import "./resetPage.css"
import axios from "axios"
import {toast, ToastContainer} from "react-toastify"
import { useState } from "react"
import GridLoader from "react-spinners/GridLoader";
const baseurl = "http://localhost:6500"


const ResetPasswordPage = ()=>{
    const navigate = useNavigate()
    const [errorMessage, displayErrorMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [conformPass, setConformPass] = useState("")
    const [formData, setFormData] = useState(
        {
        email: "",
        password: ""
    }
    )
    const handleChange = (e:any)=>{
        const { name, value } = e.target;
        setFormData((prevState)=>({
            ...prevState,
            [name]: value
        }))
        console.log(formData)
    }
    const handleValidation = ()=>{
        if(formData.password != conformPass){
            displayErrorMessage(true)
        }
        else{
            displayErrorMessage(false)
            setLoading(true)
            axios.put(`${baseurl}/v1/api/resetPassword`,formData)
            .then((response)=>{
                setTimeout(()=> navigate("/") , 3000)
                setLoading(false)
                console.log(response)
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
                })
            .catch(err=>{
                setLoading(false)
                console.log(err)
            })
        }
    }
    const handleFormSubmit = (e:any)=>{
        console.log(formData)
        e.preventDefault()
        handleValidation()
}
        return(
            <div className="forgot-password-page-wrapper">
                <div className="upper-reset-container">
                    <h2>Reset password</h2>
                    {errorMessage && (
                        <div className="display-error">
                            <h6> Passwords doesn't match</h6>
                        </div>
                    )}
                    <form onSubmit={()=>handleFormSubmit(event)}>

                        <input type="email" placeholder="write your email" name = "email" onChange={(event)=> handleChange(event)} required/>
                        <h4>Your new password</h4>
                        <input type="password" placeholder="Your new password" name = "password" onChange={(event)=> handleChange(event)} required/>
                        <input type="password" placeholder="conform password" name = "conform_pass" onChange={(event)=> setConformPass(event.target.value)} required/>

                        <button type="submit">{ !loading? "Save" : <GridLoader color={"#fff"} loading={loading} size={9} />}</button>
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

export default ResetPasswordPage