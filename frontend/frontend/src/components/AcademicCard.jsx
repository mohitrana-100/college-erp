function AcademicCard({student}){

return(

<div className="card">

<h2>

🎓 Academic Details

</h2>


<p>

📚 Department :

{student.department}

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

🎫 Roll :

{student.roll_no}

</p>

</div>

);

}

export default AcademicCard;