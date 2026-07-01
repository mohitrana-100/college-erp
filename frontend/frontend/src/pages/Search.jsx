import SearchBar from "../components/SearchBar";

function Search({

students,

teachers,

subjects,

notices

}){

return(

<div>

<h2>

🔍 Global Search

</h2>


<SearchBar

students={students}

teachers={teachers}

subjects={subjects}

notices={notices}

/>


</div>

);

}


export default Search;