
function Sidebar({

selected,

setSelected,

logout,

user,
mobileMenu

}){

let menus=[];


if(

user.role==="admin"

){

menus=[
"Dashboard",
"Files",
"Profile",
"Academic Management",

"Notifications",

"Events",

"Leave",

"Search",

"Calendar",

"Schedule",

"Students",

"Teachers",

"Attendance",

"Subjects",

"Marks",

"Fees",

"Notices",

"Analytics",

"Reports",

"Settings",

"Change Password"

];

}


else if(

user.role==="teacher"

){

menus=[
"Dashboard",
"Files",
"Profile",
"My Subjects",
"Student ID",
"My Teachers",

"Notifications",
"Events",

"Leave",

"Calendar",

"Schedule",

"Students",

"Attendance",

"Marks",

"Notices",

"Change Password"

];

}


else{

menus=[

"Dashboard",
"Files",

"Profile",

"Notifications",
"My Subjects",
"Student ID",

"My Teachers",
"Events",

"Leave",

"Calendar",

"Schedule",

"Attendance",

"Marks",

"Notices",

"Change Password"

];

}


return(


<div className={`sidebar ${mobileMenu ? "show" : ""}`}>
    <div className="sidebar-profile">




</div>
    

<h2>

🎓 WELCOME TO TIT&S

</h2>


<h4>

👋 {user.name}

</h4>


<p>

{user.role.toUpperCase()}

</p>

{

menus.map(

(item)=>(

<button

key={item}

className={

selected===item

?

"active"

:

""

}

onClick={()=>

setSelected(item)

}

>

{item}

</button>

)

)

}

<hr/>

<button

onClick={logout}

>

🚪 Logout

</button>

</div>

);

}


export default Sidebar;

