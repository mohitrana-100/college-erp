import {

useEffect,

useState

}

from "react";

import API from "./api";


function Events(){


const [

title,

setTitle

]

=

useState("");


const [

date,

setDate

]

=

useState("");


const [

events,

setEvents

]

=

useState([]);



const getEvents=async()=>{

const res=

await API.get(

"/events"

);


setEvents(

res.data

);

};



useEffect(()=>{

getEvents();

},[]);



const addEvent=async()=>{


await API.post(

"/add-event",

{

title,

date

}

);


setTitle(

""

);


setDate(

""

);


getEvents();

};



const deleteEvent=async(id)=>{


await API.delete(

`/events/${id}`

);


getEvents();

};



return(

<div>

<h2>

📅 Events

</h2>


<input

placeholder="Event"

value={title}

onChange={(e)=>

setTitle(

e.target.value

)

}

/>


<br/>

<br/>


<input

type="date"

value={date}

onChange={(e)=>

setDate(

e.target.value

)

}

/>


<br/>

<br/>


<button

onClick={addEvent}

>

Add Event

</button>


<hr/>


{

events.map(

item=>(

<div

key={item.id}

className="event-card"

>

<h3>

{item.title}

</h3>


<p>

📅

{item.date}

</p>


<button

onClick={()=>

deleteEvent(

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


export default Events;