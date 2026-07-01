function SemesterOverview({students}){

const semesterData={};

for(

let i=1;

i<=8;

i++

){

semesterData[i]=0;

}


students.forEach(

(student)=>{

const sem=

student.semester;


if(

semesterData[sem]!==undefined

){

semesterData[sem]++;

}

}

);


return(

<div>

<h2>

📚 Semester Overview

</h2>


<div className="dashboard-grid">

{

Object.entries(

semesterData

).map(

([sem,count])=>(

<div

key={sem}

className="card"

>

<h3>

Semester {sem}

</h3>


<h1>

{count}

</h1>


<p>

Students

</p>

</div>

)

)

}

</div>

</div>

);

}


export default SemesterOverview;