import {useEffect,useState} from "react";

function WelcomeBanner({user}){

const [time,setTime]=useState("");

const [date,setDate]=useState("");

useEffect(()=>{

const timer=setInterval(()=>{

const now=new Date();

setTime(

now.toLocaleTimeString()

);

setDate(

now.toDateString()

);

},1000);

return()=>clearInterval(timer);

},[]);

return(

<div className="welcome-banner">

<h1>

👋 Hello {user.name}

</h1>

<h3>

🌤️ Hope your day is going well

</h3>

<p>

📅 {date}

</p>

<p>

🕒 {time}

</p>

</div>

);

}

export default WelcomeBanner;