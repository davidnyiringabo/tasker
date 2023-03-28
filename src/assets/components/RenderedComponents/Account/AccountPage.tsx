import "./accountpage.css"
import userProfile from "/profileavatar.png"

const AccountPage = ()=>{
        return(
            <div className="accountCredentialsContainer">
                <div className="account-header">
                    <h2>Edit your profile</h2>
                </div>

                <div className="profileFormcontainer">
                    <form className="profileForm">
                        <div className="uploadPhoto">
                            <img src={userProfile}/>
                            <div className="right-upload-photo">
                                <h2>Upload photo</h2>
                                <button type="button">Choose avatar</button>
                            </div>
                        </div>
                        <div className="upload-form-control">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Samantha Cartel"/>
                        </div>
                        <div className="upload-form-control">
                            <label htmlFor="about">About</label>
                            <input type="text" name="about" id="about" placeholder="Anything about you"/>
                        </div>
                        <button type="submit" className="uploadProfileSubmit">Upload profile</button>
                    </form>
                </div>
            </div>
        )
}
export default AccountPage