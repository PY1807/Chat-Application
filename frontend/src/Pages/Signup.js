import React, { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { useEffect } from "react";
const Signup = ({setLoggedIn,setHome,setRegister,setChat})=>
{
  setChat(true);
  setRegister(false);
  setHome(true);
console.log("ha")
const navigate=useNavigate();
const [form,setform]=useState({username:"",firstName:"",
lastName:"",
email:"",
password:"",
})
const[showPassword,setPassword]=useState(false);




function changeHandler(event)
{
  event.preventDefault();
  setform((prev)=>(
    {
      ...prev,
      [event.target.name]:event.target.value
    }
  ))
}

// const endpoint = `http://127.0.0.1:8000/person/`;
const endpoint = `/person/`;
// Django endpoint http://localhost:8080
async function postdata() {
  const {username, firstName, lastName, email, password } = form;
  const data = { username,firstName, lastName, email, password };
  try {
    const response = await axios.post(endpoint, data);
    if (response.data.status === "unsuccessful") {
      toast.error(response.data.message);
      // setLoggedIn(true); // Update state to reflect logged-in status
      // navigate("/dashboard"); // Redirect to dashboard
    } else {
      console.log("Ab aayega")
      toast.success("Account Created");
      navigate("/login")
        // navigate("/dashboard",{status:{username}})
  } 
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
}

async function submitHandler(event)
{
  
  event.preventDefault();
 
        // setLoggedIn(true);
        console.log("ha");
        await postdata();
        console.log("na");
        
        
    
    
 
}

return (
<div>

   <form onSubmit={submitHandler} className='SForm'>
    <div className="U">

    <label className="Ut">
        <p>Username <sup>*</sup></p>
        <input 
        required
        type="text"
        name="username"
        placeholder="Enter first name here"
        value={form.username}
        onChange={changeHandler}/>
      </label>


      <label className="Ut">
        <p>First Name <sup>*</sup></p>
        <input 
        required
        type="text"
        name="firstName"
        placeholder="Enter first name here"
        value={form.firstName}
        onChange={changeHandler}/>
      </label>

  <label className="Ut">
    <p>Last Name <sup>*</sup></p>
    <input 
    required
    type="text"
    name="lastName"
    placeholder="Enter last name here"
    value={form.lastName}
    onChange={changeHandler}/>
  </label>
  </div>
{/* <label>
<p>Country </p>
<select 
            required
            name="country"
            value={form.country}
            onChange={changeHandler}
          >
            <option className="J" value="" disabled>Select a country</option>
            {countries.map(country => (
              <option key={country.cca2} value={country.cca2}>
                {country.name.common}
              </option>
            ))}
          </select>
</label> */}

{/* </div> */}
 

<label className="Ut">
    <p>Email Address </p>
    <input 
    required
    type="email"
    name="email"
    placeholder="Enter email address here"
    value={form.email}
    onChange={changeHandler}/>
  </label>
  


  <div className="Ut">
  <label className="Ut">
    <p>Create Password <sup>*</sup></p>
    <input 
    required
    type= {showPassword?("text"):("password")}
    name="password"
    placeholder="Enter Password here"
    value={form.password}
    onChange={changeHandler}/>
   
  </label>
  <span className="A" onClick={()=>setPassword((prev)=> !prev)}>
        {showPassword?(<AiOutlineEye/>):(<AiOutlineEyeInvisible/>)}
      </span>
  </div>
 
  {/* <div className="Ut1">
    <div className="At">
    <p>
      {
        !showsymbol?(<RxCross1 />):(<TiTick />)
      }
    </p>
    <p>
      {
        !showsymbol1?(<RxCross1 />):(<TiTick />)
      }
    </p>
    <p>
      {
        !showsymbol2?(<RxCross1 />):(<TiTick />)
      }
    </p>
    <p>
      {
        !showsymbol3?(<RxCross1 />):(<TiTick />)
      }
    </p>
    </div>
    <div className="A">
    <span>Password length more than 8</span>
    <span>Presence of a Digit</span>
    <span>Presence of Uppercase Character</span>
    <span>Presence of Special Character</span>
    </div>
  </div> */}

  <button className="but">Create Account</button>
   </form>
    </div>
);
}

export default Signup;