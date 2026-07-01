import {

useEffect,

useState

}

from "react";

import API from "./api";


function Search(){


const [

query,

setQuery

]

=

useState("");


const [

students,

setStudents

]

=

useState([]);


const [

teachers,

setTeachers

]

=

useState([]);


const [

subjects,

setSubjects

]

=

useState([]);


const [

notices,

setNotices

]

=

useState([]);


const [

fees,

setFees

]

=

useState([]);


const [

marks,

setMarks

]

=

useState([]);


const [

timetable,

setTimetable

]

=

useState([]);



useEffect(()=>{

loadData();

},[]);



const loadData=async()=>{

try{


const studentRes=

await API.get(

"/students"

);


const teacherRes=

await API.get(

"/teachers"

);


const subjectRes=

await API.get(

"/subjects"

);


const noticeRes=

await API.get(

"/notices"

);


const feeRes=

await API.get(

"/fees"

);


const marksRes=

await API.get(

"/marks"

);


const timetableRes=

await API.get(

"/timetable"

);



setStudents(

studentRes.data

);


setTeachers(

teacherRes.data

);


setSubjects(

subjectRes.data

);


setNotices(

noticeRes.data

);


setFees(

feeRes.data

);


setMarks(

marksRes.data

);


setTimetable(

timetableRes.data

);


}

catch(err){

console.log(err);

}

};



const search=

query.toLowerCase();



const studentResults=

students.filter(

item=>

item.name

?.toLowerCase()

.includes(search)

);



const teacherResults=

teachers.filter(

item=>

item.name

?.toLowerCase()

.includes(search)

);



const subjectResults=

subjects.filter(

item=>

item.name

?.toLowerCase()

.includes(search)

);



const noticeResults=

notices.filter(

item=>

item.message

?.toLowerCase()

.includes(search)

);



const feeResults=

fees.filter(

item=>

item.student_name

?.toLowerCase()

.includes(search)

);



const marksResults=

marks.filter(

item=>

item.student_name

?.toLowerCase()

.includes(search)

);



const timetableResults=

timetable.filter(

item=>

item.subject

?.toLowerCase()

.includes(search)

);



return(

<div>

<h2>

🔍 ERP Search Engine

</h2>


<input

className="global-search"

placeholder=

"Search everything..."

value={query}

onChange={(e)=>

setQuery(

e.target.value

)

}

/>


{

query!=="" &&

<>


{

studentResults.map(

item=>(

<div

key={item.id}

className="search-card"

>

<h3>

👨‍🎓

{item.name}

</h3>


<p>

📧

{item.email}

</p>

</div>

)

)


}


{

teacherResults.map(

item=>(

<div

key={item.id}

className="search-card"

>

<h3>

👨‍🏫

{item.name}

</h3>


<p>

📧

{item.email}

</p>

</div>

)

)


}


{

subjectResults.map(

item=>(

<div

key={item.id}

className="search-card"

>

<h3>

📚

{item.name}

</h3>

</div>

)

)


}


{

noticeResults.map(

item=>(

<div

key={item.id}

className="search-card"

>

<h3>

📢 Notice

</h3>


<p>

{item.message}

</p>

</div>

)

)


}


{

feeResults.map(

item=>(

<div

key={item.id}

className="search-card"

>

<h3>

💰 Fee

</h3>


<p>

{item.student_name}

</p>


<p>

₹ {item.amount}</p>


<p>

{item.status}

</p>

</div>

)

)


}


{

marksResults.map(

item=>(

<div

key={item.id}

className="search-card"

>

<h3>

📝 Marks

</h3>


<p>

{item.student_name}

</p>


<p>

{item.subject}

</p>


<p>

{item.marks}

</p>

</div>

)

)


}


{

timetableResults.map(

item=>(

<div

key={item.id}

className="search-card"

>

<h3>

📅 Timetable

</h3>


<p>

{item.day}

</p>


<p>

{item.subject}

</p>


<p>

{item.time}

</p>

</div>

)

)


}


</>

}


</div>

);

}


export default Search;