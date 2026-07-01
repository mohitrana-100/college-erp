
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import AcademicManagement from "./AcademicManagement";
import MySubjects from "./pages/MySubjects";
import Files from "./Files";

import MyTeachers from "./pages/MyTeachers";
import StudentID from "./pages/StudentID";

import Home from "./pages/Home";

import Profile from "./Profile";

import Notifications from "./pages/Notifications";

import Calendar from "./pages/Calendar";

import Schedule from "./pages/Schedule";

import Search from "./Search";

import Events from "./Events";

import Leave from "./Leave";

import Student from "./Student";

import Teacher from "./Teacher";

import Attendance from "./Attendance";

import Subject from "./Subject";

import Marks from "./Marks";

import Fees from "./Fees";

import Notice from "./Notice";

import RealStatistics from "./RealStatistics";

import Report from "./Report";

import Settings from "./Settings";

import ChangePassword from "./ChangePassword";


function Dashboard({

user,

setUser

}){
const [mobileMenu,setMobileMenu]=useState(false);
const [

selected,

setSelected

]=

useState(

"Dashboard"

);


const logout=()=>{

localStorage.removeItem(

"token"

);


localStorage.removeItem(

"user"

);

setUser(

null

);

};


const renderPage=()=>{

switch(selected){

case "Dashboard":

return <Home user={user}/>;

case "Academic Management":
return <AcademicManagement/>

case "Files":

return(

<Files

user={user}

/>

);

case "My Subjects":

return <MySubjects/>;

case "My Teachers":

return <MyTeachers/>;
case "Student ID":

return <StudentID user={user}/>;

return <AcademicManagement/>;
case "Profile":

return <Profile user={user}/>;


case "Notifications":

return <Notifications/>;


case "Events":

return <Events/>;


case "Leave":

return <Leave/>;


case "Search":

return <Search/>;


case "Calendar":

return <Calendar/>;


case "Schedule":

return <Schedule/>;


case "Students":

return <Student user={user}/>;


case "Teachers":

return <Teacher user={user}/>;


case "Attendance":

return <Attendance/>;


case "Subjects":

return <Subject/>;


case "Marks":

return <Marks/>;


case "Fees":

return <Fees/>;


case "Notices":
A
return <Notice/>;


case "Analytics":

return <RealStatistics/>;


case "Reports":

return <Report/>;


case "Settings":

return <Settings/>;


case "Change Password":

return <ChangePassword user={user}/>;


default:

return <div>Page Not Found</div>;

}

};


return(


<div className="dashboard-layout">
<button
className="menu-btn"
onClick={()=>setMobileMenu(!mobileMenu)}
>
☰
</button>

<Sidebar

selected={selected}

setSelected={setSelected}

logout={logout}

user={user}
mobileMenu={mobileMenu}
/>


<div className="main">

{renderPage()}

</div>

</div>

);

}


export default Dashboard;

