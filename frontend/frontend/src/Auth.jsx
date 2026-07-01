import { useState } from "react";

import Login from "./Login";

import Signup from "./Signup";

import logo from "./assets/logo.png";

import { motion } from "framer-motion";

function Auth({ setUser }) {

const [showSignup,setShowSignup]=useState(false);

return(

<div className="auth-page">

<motion.div

className="auth-card"

initial={{opacity:0,y:50}}

animate={{opacity:1,y:0}}

transition={{duration:0.7}}

>

<img

src={logo}

alt="logo"

className="auth-logo"

/>

<h1>

🎓 College ERP

</h1>

<p>

Smart Campus Management System
by rana since 1917

</p>

{

showSignup

?

<Signup

setShowSignup={setShowSignup}

/>

:

<Login

setUser={setUser}

/>

}

<div className="auth-switch">

{

showSignup

?

<>

Already have an account?

<button

onClick={()=>

setShowSignup(false)

}

>

Login

</button>

</>

:

<>

Don't have an account?

<button

onClick={()=>

setShowSignup(true)

}

>

Sign Up

</button>

</>

}

</div>

</motion.div>

</div>

);

}

export default Auth;