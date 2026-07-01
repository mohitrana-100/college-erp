function StudentID({user}){

const student={

name:user.name,

roll:"22012012045",

department:"Computer Science",

semester:"5",

section:"A",

batch:"2023-2027"

};


return(

<div>

<h1>

🪪 Student ID Card

</h1>


<div className="id-card">

<img

src="https://via.placeholder.com/120"

alt="student"

/>


<h2>

{student.name}

</h2>


<p>

🎫 Roll :

{student.roll}

</p>


<p>

🎓 Department :

{student.department}

</p>


<p>

📚 Semester :

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


<button>

🖨 Print

</button>


<button>

📥 Download

</button>

</div>

</div>

);

}


export default StudentID;