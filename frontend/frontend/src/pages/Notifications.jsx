import { useState } from "react";

function Notifications() {

const [

notifications,

setNotifications

]

=

useState([

{

id:1,

message:"📢 New notice added"

},

{

id:2,

message:"💰 Fee due tomorrow"

},

{

id:3,

message:"📝 Assignment uploaded"

}

]);


const deleteNotification=(id)=>{

setNotifications(

notifications.filter(

(item)=>

item.id!==id

)

);

};


return(

<div>

<h2>

🔔 Notifications

</h2>


{

notifications.length===0

?

<p>

No notifications

</p>

:

notifications.map(

(item)=>(

<div

key={item.id}

className="notification-card"

>

<p>

{item.message}

</p>


<button

onClick={()=>

deleteNotification(

item.id

)

}

>

❌

</button>

</div>

)

)

}


</div>

);

}


export default Notifications;