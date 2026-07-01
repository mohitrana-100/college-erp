import { useState } from "react";

function SearchBar({

students,

teachers,

subjects,

notices

}) {

const [

query,

setQuery

]

=

useState("");



if(

query===""

){

return(

<div>

<input

className="global-search"

placeholder="🔍 Search everything..."

value={query}

onChange={(e)=>

setQuery(

e.target.value

)

}

/>

</div>

);

}



const search=

query.toLowerCase();



const studentResults=

students.filter(

(item)=>

item.name

?.toLowerCase()

.includes(

search

)

);



const teacherResults=

teachers.filter(

(item)=>

item.name

?.toLowerCase()

.includes(

search

)

);



const subjectResults=

subjects.filter(

(item)=>

item.name

?.toLowerCase()

.includes(

search

)

);



const noticeResults=

notices.filter(

(item)=>

item.message

?.toLowerCase()

.includes(

search

)

);



return(

<div>

<input

className="global-search"

placeholder="🔍 Search everything..."

value={query}

onChange={(e)=>

setQuery(

e.target.value

)

}

/>


<div className="search-results">

<h3>

Results

</h3>


{

studentResults.map(

(item)=>(

<p key={item.id}>

👨‍🎓

{item.name}

</p>

)

)

}


{

teacherResults.map(

(item)=>(

<p key={item.id}>

👨‍🏫

{item.name}

</p>

)

)

}


{

subjectResults.map(

(item)=>(

<p key={item.id}>

📚

{item.name}

</p>

)

)

}


{

noticeResults.map(

(item)=>(

<p key={item.id}>

📢

{item.message}

</p>

)

)

}


</div>

</div>

);

}

export default SearchBar;