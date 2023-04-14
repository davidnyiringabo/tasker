import "../Terms/terms.css"
const AboutPage = ()=>{
    return(
        <div className="about-page-container">
            <div className="about-content-container">
                <div>
                    <h4>Welcome to Tasker!</h4>                
                    We are dedicated to helping you organize and prioritize your daily tasks, making your life easier and more efficient.
                </div>

                <div className="content">
                    <p>Our application was designed to provide a simple, intuitive interface that allows you to easily create, track, and manage all of your tasks in one convenient location. Our goal is to streamline your workflow and eliminate the stress that comes with managing a busy schedule.</p> 

                    <p>Our team has worked tirelessly to create a task management application that is not only functional but also enjoyable to use. We understand that keeping track of your tasks can be overwhelming, which is why our app offers a variety of features to help simplify the process. From setting reminders and due dates to organizing tasks into categories, our app has everything you need to stay on top of your to-do list.</p> 

                    <p>One of the unique features of our application is the ability to collaborate with others on tasks. Whether you’re working on a group project at work or simply sharing tasks with family members, our app allows you to easily assign tasks and track progress in real-time.</p> 

                    <p>At our task management application, we are committed to providing our users with the best possible experience. We are constantly updating our app with new features and improvements based on user feedback, so please don’t hesitate to reach out with any suggestions or concerns.</p> 

                    <strong style={{textAlign:"center"}}>We look forward to being a part of your daily routine!</strong> 
                </div>
            </div>
        </div>
    )
}
export default AboutPage