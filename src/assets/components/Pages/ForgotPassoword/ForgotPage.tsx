import {Link} from "react-router-dom"
import "./forgot.css"

const ForgotPasswordPage = ()=>{
        return(
            <div className="forgot-password-page-wrapper">
                <div className="upper-container">
                    <h2>Ooops!</h2>
                    <h3>This resource is still under construction , and is soon to be released</h3>
                    <Link to="/" className="link-to-main"><button type="button" className="navigate-button">Return</button></Link>
                </div>
            </div>
        )
}

export default ForgotPasswordPage