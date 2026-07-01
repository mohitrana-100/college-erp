import {

useEffect,

useState

}

from "react";

import API from "./api";


function Leave(){


const [

name,

setName

]

=

useState("");


const [

reason,

setReason

]

=

useState("");


const [

leaves,

setLeaves

]

=

useState([]);



const getLeaves=async()=>{


const res=

await API.get(

"/leave"

);


setLeaves(

res.data

);

};



useEffect(()=>{

getLeaves();

},[]);



const addLeave=async()=>{


await API.post(

"/add-leave",

{

name,

reason

}

);


setName(

""

);


setReason(

""

);


getLeaves();

};



const deleteLeave=async(id)=>{


await API.delete(

`/leave/${id}`

);


getLeaves();

};



return(

<div>

<h2>

📝 Leave Application

</h2>


<input

placeholder="Student Name"

value={name}

onChange={(e)=>

setName(

e.target.value

)

}

/>


<br/>

<br/>


<textarea

placeholder="Reason"

value={reason}

onChange={(e)=>

setReason(

e.target.value

)

}

/>


<br/>

<br/>


<button

onClick={addLeave}

>

Submit Leave

</button>


<hr/>


{

leaves.map(

item=>(

<div

key={item.id}

className="leave-card"

>

<h3>

{item.name}

</h3>


<p>

{item.reason}

</p>


<button

onClick={()=>

deleteLeave(

item.id

)

}

>

Delete

</button>


<hr/>

</div>

)

)

}


</div>

);

}


export default Leave;