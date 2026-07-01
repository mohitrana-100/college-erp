// components/DashboardHeader.jsx

function DashboardHeader({user}) {

const today = new Date();

const greeting =
today.getHours() < 12
? "Good Morning"
: today.getHours() < 18
? "Good Afternoon"
: "Good Evening";

return (

<div className="dashboard-header">

<h1>
👋 {greeting}, {user.name}
</h1>

<p>
{today.toLocaleDateString()}
</p>

</div>

);

}

export default DashboardHeader;