import { useState } from "react";

import API from "./api";

function Signup({ setShowSignup }) {

const [form,setForm]=useState({

name:"",

email:"",

password:"",

role:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};



const handleSignup=async()=>{

try{

const res=await API.post(

"/signup",

form

);


alert(

res.data.message

);


setShowSignup(false);

}

catch(error){

console.log(error);


alert(

error.response?.data?.detail ||

"Signup failed"

);

}

};



return(

<div>

<h2>

Create Account

</h2>


<input

name="name"

placeholder="Full Name"

onChange={handleChange}

/>

<br/><br/>


<input

type="email"

name="email"

placeholder="Email"

onChange={handleChange}

/>

<br/><br/>


<input

type="password"

name="password"

placeholder="Password"

onChange={handleChange}

/>

<br/><br/>


<select

name="role"

value={form.role}

onChange={handleChange}

>

<option value="">

Select Role

</option>

<option value="student">

Student

</option>

<option value="teacher">

Teacher

</option>

<option value="admin">

Admin

</option>

</select>


<br/><br/>


<button

onClick={handleSignup}

>

Signup

</button>

</div>

);

}

export default Signup;