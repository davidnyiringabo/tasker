import { useState } from "react"
import "./accountpage.css"
import userProfile from "/profileavatar.png"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import {baseurl} from "../../../data/api"


const AccountPage = ()=>{

    const [formData, setFormData] = useState({
        name: '',
        about:''
    })
    const cookie= document.cookie.split('=')
    const userEmail = cookie[1]

    const handlechange = (e:any)=>{
        const {name,value} = e.target
        setFormData((prevState)=>({
            ...prevState,
            [name]: value
        }))
        console.log(formData)
    }

    const handleSubmit = (e:any)=>{
            e.preventDefault()
            axios.put(`${baseurl}/v1/api/updateUser/${userEmail}`,formData)
                .then(()=>{
                setTimeout(()=> window.location.reload(),4000)
                 toast.success("updated successfully",{
                      position: "top-right",
                      autoClose: 2500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      });
                 })
                .catch(err=>{
                    console.log(err)
                })

    }


        return(
            <div className="accountCredentialsContainer">
                <div className="account-header">
                    <h2>Edit your profile</h2>
                </div>

                <div className="profileFormcontainer">
                    <form className="profileForm" onSubmit={(e)=> handleSubmit(e)}>
                        <div className="uploadPhoto">
                            <img src={userProfile}/>
                            <div className="right-upload-photo">
                                <h2>Upload photo</h2>
                                <button type="button" style={{cursor:"not-allowed"}}>Choose avatar</button>
                            </div>
                        </div>
                        <div className="upload-form-control">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Your new name" onChange={(e)=>handlechange(e)}/>
                        </div>
                        <div className="upload-form-control">
                            <label htmlFor="about">About</label>
                            <input type="text" name="about" id="about" placeholder="Anything about you" onChange={(e)=>handlechange(e)}/>
                        </div>
                        <button type="submit" className="uploadProfileSubmit">Upload profile</button>
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
export default AccountPage