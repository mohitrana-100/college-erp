// components/RecentNotifications.jsx

import {useEffect,useState} from "react";
import API from "../api";

function RecentNotifications(){

const [notifications,setNotifications]=useState([]);

useEffect(()=>{

loadNotifications();

},[]);

const loadNotifications=async()=>{

try{

const res=await API.get(
"/notifications"
);

setNotifications(
res.data.slice(0,5)
);

}
catch(err){

console.log(err);

}

};

return(

<div className="widget-card">

<h3>
🔔 Recent Notifications
</h3>

{
notifications.map((n,index)=>(

<div key={index}>

📢 {n.title}

</div>

))
}

</div>

);

}

export default RecentNotifications;