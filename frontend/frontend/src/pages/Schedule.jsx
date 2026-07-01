function Schedule() {

const schedule=[

{

time:"09:00 AM",

subject:"Mathematics"

},

{

time:"11:00 AM",

subject:"Physics"

},

{

time:"02:00 PM",

subject:"DBMS"

}

];


return(

<div>

<h2>

🗓 Today's Schedule

</h2>


{

schedule.map(

(item,index)=>(

<div

key={index}

className="schedule-card"

>

<p>

{item.time}

</p>


<p>

{item.subject}

</p>

</div>

)

)

}


</div>

);

}


export default Schedule;