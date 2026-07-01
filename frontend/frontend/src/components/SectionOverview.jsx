function SectionOverview({students}){

let a=0;

let b=0;


students.forEach(

(student)=>{

if(

student.section==="A"

){

a++;

}


if(

student.section==="B"

){

b++;

}

}


);


return(

<div>

<h2>

🏫 Section Distribution

</h2>


<div className="dashboard-grid">


<div className="card">

<h3>

Section A

</h3>


<h1>

{a}

</h1>

</div>


<div className="card">

<h3>

Section B

</h3>


<h1>

{b}

</h1>

</div>


</div>

</div>

);

}


export default SectionOverview;