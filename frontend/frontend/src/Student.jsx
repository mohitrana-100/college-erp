import { useEffect, useState } from "react";

import API from "./api";


function Student({user})  {

const emptyForm={

roll_no:"",

name:"",

email:"",

course:"",

semester:"",

section:"",

batch:"",

father_name:"",

mother_name:"",

phone:"",

address:""

};


const [

form,

setForm

]

=

useState(

emptyForm

);


const [

students,

setStudents

]

=

useState([]);


const [

search,

setSearch

]

=

useState("");


const [

editingId,

setEditingId

]

=

useState(null);



useEffect(()=>{

getStudents();

},[]);



const getStudents=async()=>{

try{

const res=

await API.get(

"/students"

);

setStudents(

res.data

);

}

catch(err){

console.log(err);

}

};



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:

e.target.value

});

};



const saveStudent=async()=>{

try{


if(

editingId

){

await API.put(

`/students/${editingId}`,

form

);


alert(

"Student updated"

);

}


else{

await API.post(

"/add-student",

form

);


alert(

"Student added"

);

}


setForm(

emptyForm

);


setEditingId(

null

);


getStudents();

}

catch(err){

console.log(err);

}

};



const editStudent=(student)=>{

setEditingId(

student.id

);


setForm({

roll_no:

student.roll_no,

name:

student.name,

email:

student.email,

course:

student.course,

semester:

student.semester,

section:

student.section,

batch:

student.batch,

father_name:

student.father_name,

mother_name:

student.mother_name,

phone:

student.phone,

address:

student.address

});

};



const deleteStudent=async(id)=>{

try{

await API.delete(

`/students/${id}`

);


alert(

"Student deleted"

);


getStudents();

}

catch(err){

console.log(err);

}

};



const filteredStudents=

students.filter(

(student)=>

student.name

.toLowerCase()

.includes(

search

.toLowerCase()

)

);
const isAdmin=

user?.role==="admin";

const isTeacher=

user?.role==="teacher";

const canManage=

isAdmin || isTeacher;



return(

<div>


<h2>

🎓 Student Management

</h2>

{

!canManage &&

(

<p>

⚠️ Students can only view student information.

</p>

)

}


<hr/>


<input

name="roll_no"

placeholder="Roll Number"

value={form.roll_no}

onChange={handleChange}

/>


<br/><br/>


<input

name="name"

placeholder="Student Name"

value={form.name}

onChange={handleChange}

/>


<br/><br/>


<input

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>


<br/><br/>


<input

name="course"

placeholder="Course"

value={form.course}

onChange={handleChange}

/>


<br/><br/>


<input

name="semester"

placeholder="Semester"

value={form.semester}

onChange={handleChange}

/>


<br/><br/>


<input

name="section"

placeholder="Section"

value={form.section}

onChange={handleChange}

/>


<br/><br/>


<input

name="batch"

placeholder="Batch"

value={form.batch}

onChange={handleChange}

/>


<br/><br/>


<input

name="father_name"

placeholder="Father Name"

value={form.father_name}

onChange={handleChange}

/>


<br/><br/>


<input

name="mother_name"

placeholder="Mother Name"

value={form.mother_name}

onChange={handleChange}

/>


<br/><br/>


<input

name="phone"

placeholder="Phone"

value={form.phone}

onChange={handleChange}

/>


<br/><br/>


<textarea

name="address"

placeholder="Address"

value={form.address}

onChange={handleChange}

/>


<br/><br/>


<button

onClick={saveStudent}

>

{

editingId

?

"✏️ Update Student"

:

"➕ Add Student"

}

</button>


<hr/>


<h3>

🔍 Search Student

</h3>


<input

placeholder="Search"

value={search}

onChange={(e)=>

setSearch(

e.target.value

)

}

/>


<hr/>


<h3>

📊 Total Students :

{

students.length

}

</h3>


{

filteredStudents.map(

(student)=>(

<div

key={student.id}

className="card"

>


<h3>

{student.name}

</h3>


<p>

🎫 Roll :

{student.roll_no}

</p>


<p>

📧 Email :

{student.email}

</p>


<p>

📚 Course :

{student.course}

</p>


<p>

📖 Semester :

{student.semester}

</p>


<p>

🏫 Section :

{student.section}

</p>


<p>

📅 Batch :

{student.batch}

</p>


<p>

👨 Father :

{student.father_name}

</p>


<p>

👩 Mother :

{student.mother_name}

</p>


<p>

📱 Phone :

{student.phone}

</p>


<p>

🏠 Address :

{student.address}

</p>


{

canManage &&

(

<button

onClick={()=>

editStudent(

student

)

}

>

✏️ Edit

</button>

)

}

{

isAdmin &&

(

<button

onClick={()=>

deleteStudent(

student.id

)

}

>

🗑 Delete

</button>

)

}


<hr/>


</div>

)

)

}


</div>

);

}


export default Student;