function MySubjects(){

const subjects=[

"DBMS",

"Operating System",

"Computer Networks",

"Software Engineering",

"AI"

];

return(

<div>

<h1>

📚 My Subjects

</h1>

<div className="dashboard-grid">

{

subjects.map(

(subject,index)=>(

<div

key={index}

className="card"

>

<h2>

{subject}

</h2>

</div>

)

)

}

</div>

</div>

);

}

export default MySubjects;