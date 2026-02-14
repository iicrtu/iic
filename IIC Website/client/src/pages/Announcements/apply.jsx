import React from "react";
import {useNavigate} from "react-router-dom";
const Apply =()=>{
    const navigate =useNavigate();
    return(
<div style={{padding:"40px"}}>
<h1>Company Name</h1>
<p>Domain</p>
<p>Time peroiod</p>
<p>Stipend</p>
<p>Eligibility/Requirement</p>
<button  
onClick={()=>navigate(-1)}
style={{marginTop:"20px"}}
>Back</button>
</div>




    );
};
export default Apply;