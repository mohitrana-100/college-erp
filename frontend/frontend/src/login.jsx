import { useState } from "react";

import API from "./api";

function Login({ setUser }) {

const [form,setForm]=useState({

email:"",

password:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};



const handleLogin=async()=>{

try{

const res=await API.post(

"/login",

form

);


localStorage.setItem(

"token",

res.data.token

);


const loggedUser={

name:res.data.name,

email:form.email,

role:res.data.role

};


setUser(

loggedUser

);


localStorage.setItem(

"user",

JSON.stringify(

loggedUser

)

);


alert(

"✅ Login successful"

);

}

catch(err){

console.log(err);

alert(

"❌ Invalid email or password"

);

}

};



return(

<div>

<h2>

Welcome Back 👋

</h2>


<input

type="email"

name="email"

placeholder="📧 Enter Email"

value={form.email}

onChange={handleChange}

/>


<input

type="password"

name="password"

placeholder="🔒 Enter Password"

value={form.password}

onChange={handleChange}

/>


<button

onClick={handleLogin}

>

🚀 Login

</button>

</div>

);

}

export default Login;