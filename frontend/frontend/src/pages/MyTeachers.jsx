function MyTeachers(){

const teachers=[

{

name:"Dr Sharma",

subject:"DBMS"

},

{

name:"Dr Verma",

subject:"OS"

},

{

name:"Dr Singh",

subject:"CN"

}

];

return(

<div>

<h1>

👨‍🏫 My Teachers

</h1>

{

teachers.map(

(item,index)=>(

<div

key={index}

className="card"

>

<h2>

{item.name}

</h2>

<p>

📚 {item.subject}

</p>

</div>

)

)

}

</div>

);

}

export default MyTeachers;