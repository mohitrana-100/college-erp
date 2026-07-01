import {useState} from "react";

function AcademicManagement(){

const [semester,setSemester]=useState("");

const [section,setSection]=useState("");

const [subject,setSubject]=useState("");

const [teacher,setTeacher]=useState("");

const [allocations,setAllocations]=useState([]);


const addAllocation=()=>{

if(

semester===""

||

section===""

||

subject===""

||

teacher===""

){

return alert(

"Fill all fields"

);

}


const data={

semester,

section,

subject,

teacher

};


setAllocations(

[

...allocations,

data

]

);


setSemester("");

setSection("");

setSubject("");

setTeacher("");

};


return(

<div>

<h1>

🏫 Academic Management

</h1>


<h3>

Allocate Subject Teacher

</h3>


<select

value={semester}

onChange={(e)=>

setSemester(

e.target.value

)

}

>

<option>

Semester

</option>

{

[1,2,3,4,5,6,7,8]

.map(

(s)=>

<option key={s}>

{s}

</option>

)

}

</select>


<select

value={section}

onChange={(e)=>

setSection(

e.target.value

)

}

>

<option>

Section

</option>

<option>

A

</option>

<option>

B

</option>

</select>


<input

placeholder="Subject"

value={subject}

onChange={(e)=>

setSubject(

e.target.value

)

}

/>


<input

placeholder="Teacher"

value={teacher}

onChange={(e)=>

setTeacher(

e.target.value

)

}

/>


<button

onClick={addAllocation}

>

➕

Allocate

</button>


<hr/>


{

allocations.map(

(item,index)=>(

<div

key={index}

className="card"

>

<h3>

Semester {item.semester}

</h3>


<p>

🏫 Section {item.section}

</p>


<p>

📚 {item.subject}

</p>


<p>

👨‍🏫 {item.teacher}

</p>

</div>

)

)

}

</div>

);

}


export default AcademicManagement;