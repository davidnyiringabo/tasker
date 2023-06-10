import * as React from 'react';
import { GridLoader } from 'react-spinners';

const Loader = ()=>{
  let [loading, setLoading] = React.useState(true);

    return(
           <div style={{width:"100%",height:"30%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <GridLoader
                    color={"#0075FF"}
                    loading={loading}
                    size={17}
                />
           </div>
    )
}

export default Loader