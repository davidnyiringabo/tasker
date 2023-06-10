import * as React from 'react';
import { GridLoader } from 'react-spinners';
import "../../Pages/Login/login.css"


const override= {
    display: "block",
    margin: "3% auto",
    borderColor: "red",
  };

const PageLoader = ()=>{
  let [loading, setLoading] = React.useState(true);

    return(
        <div className='overall-container'>
            <GridLoader
                color={"#0075FF"}
                loading={loading}
                cssOverride={override}
                size={17}
                className='centered'
            />
        </div>
    )
}

export default PageLoader