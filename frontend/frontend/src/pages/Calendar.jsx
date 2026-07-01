function Calendar() {

const today =

new Date();


return(

<div>

<h2>

📅 Calendar

</h2>


<h3>

{

today.toDateString()

}

</h3>


</div>

);

}


export default Calendar;